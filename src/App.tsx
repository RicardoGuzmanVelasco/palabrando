import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { User } from '@supabase/supabase-js'
import { AuthView } from './AuthView'
import { supabase } from './lib/supabase'
import type { Language } from './types'

type WordCard = {
  id: string
  term: string
  language: Language
  usageNote: string
  example: string
  savedAt: number
}

const STORAGE_KEY = 'palabrando.word-cards.v1'
const logoUrl = new URL('../design/logos/logo-comillas-agua.svg', import.meta.url).href
const words = {
  es: {
    brandLabel: 'Palabrando, inicio',
    notebook: 'Cuaderno',
    addWord: 'Añadir palabra',
    term: 'Palabra o expresión',
    language: 'Idioma',
    spanish: 'Español',
    english: 'Inglés',
    save: 'Guardar',
    saving: 'Guardando…',
    savedLocal: 'se guardó en este dispositivo.',
    savedAccount: 'se guardó.',
    emptyTerm: 'Escribe una palabra o expresión para guardarla.',
    saveError: 'No se pudo guardar. Tu palabra sigue aquí; prueba otra vez.',
    loadError: 'No se pudieron cargar las palabras.',
    recent: 'Cartas',
    usage: 'Uso',
    example: 'Ejemplo',
    edit: 'Editar',
    delete: 'Eliminar',
    saveChanges: 'Guardar cambios',
    savingChanges: 'Guardando…',
    cancel: 'Cancelar',
    deleteConfirm: '¿Eliminar «{term}»?',
    deleteError: 'No se pudo eliminar la palabra.',
    editError: 'No se pudieron guardar los cambios.',
    empty: 'Aún no hay palabras.',
    signOut: 'Cerrar sesión',
    loading: 'Cargando…',
  },
  en: {
    brandLabel: 'Palabrando, home',
    notebook: 'Notebook',
    addWord: 'Add word',
    term: 'Word or expression',
    language: 'Language',
    spanish: 'Spanish',
    english: 'English',
    save: 'Save',
    saving: 'Saving…',
    savedLocal: 'was saved on this device.',
    savedAccount: 'was saved.',
    emptyTerm: 'Enter a word or expression to save it.',
    saveError: 'Could not save. Your word is still here; try again.',
    loadError: 'Could not load words.',
    recent: 'Cards',
    usage: 'Usage',
    example: 'Example',
    edit: 'Edit',
    delete: 'Delete',
    saveChanges: 'Save changes',
    savingChanges: 'Saving…',
    cancel: 'Cancel',
    deleteConfirm: 'Delete “{term}”?',
    deleteError: 'Could not delete the word.',
    editError: 'Could not save the changes.',
    empty: 'No words yet.',
    signOut: 'Sign out',
    loading: 'Loading…',
  },
} as const

function readCards(): WordCard[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const legacy = saved ? null : localStorage.getItem('palabrando.word-notes.v1')
    if (!saved && !legacy) return []

    const value: unknown = JSON.parse(saved ?? legacy ?? '[]')
    if (!Array.isArray(value)) return []

    return value.flatMap((card): WordCard[] => {
      if (
        typeof card?.id !== 'string' ||
        typeof card?.term !== 'string' ||
        (card?.language !== 'es' && card?.language !== 'en') ||
        typeof card?.savedAt !== 'number'
      ) return []

      return [{
        id: card.id,
        term: card.term,
        language: card.language,
        usageNote: typeof card.usageNote === 'string' ? card.usageNote : '',
        example: typeof card.example === 'string' ? card.example : '',
        savedAt: card.savedAt,
      }]
    })
  } catch {
    return []
  }
}

function App() {
  const [cards, setCards] = useState<WordCard[]>(readCards)
  const [term, setTerm] = useState('')
  const [language, setLanguage] = useState<Language>('es')
  const [interfaceLanguage, setInterfaceLanguage] = useState<Language>('es')
  const [feedback, setFeedback] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(!supabase)
  const [cardsLoading, setCardsLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [usageDraft, setUsageDraft] = useState('')
  const [exampleDraft, setExampleDraft] = useState('')
  const [savingCardId, setSavingCardId] = useState<string | null>(null)
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null)
  const [cardError, setCardError] = useState<{ id: string; message: string } | null>(null)
  const copy = words[interfaceLanguage]

  useEffect(() => {
    if (!supabase) return
    let active = true

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return
      setUser(error ? null : data.user)
      setAuthReady(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !user) {
      const localCards = readCards()
      setCards(localCards)
      return
    }

    let active = true
    setCardsLoading(true)
    setFeedback('')

    async function loadAccount() {
      if (!supabase || !user) return
      const metadataLanguage = user.user_metadata?.app_language === 'en' ? 'en' : 'es'
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('app_language')
        .eq('id', user.id)
        .maybeSingle()
      if (profileError) throw profileError

      const savedInterfaceLanguage: Language = profile?.app_language === 'en' ? 'en' : metadataLanguage
      if (!profile) {
        const { error } = await supabase.from('profiles').upsert(
          { id: user.id, app_language: metadataLanguage, writing_languages: [] },
          { onConflict: 'id', ignoreDuplicates: true },
        )
        if (error) throw error
      }

      const { data, error } = await supabase
        .from('word_cards')
        .select('id, term, language, usage_note, example, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      if (!active) return

      setInterfaceLanguage(savedInterfaceLanguage)
      setCards((data ?? []).map((card) => ({
        id: card.id,
        term: card.term,
        language: card.language === 'en' ? 'en' as const : 'es' as const,
        usageNote: card.usage_note ?? '',
        example: card.example ?? '',
        savedAt: new Date(card.created_at).getTime(),
      })))
    }

    loadAccount()
      .catch(() => { if (active) setFeedback(copy.loadError) })
      .finally(() => { if (active) setCardsLoading(false) })

    return () => { active = false }
  }, [user])

  async function saveWord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanTerm = term.trim()
    if (!cleanTerm) {
      setFeedback(copy.emptyTerm)
      return
    }

    const localCard: WordCard = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      term: cleanTerm,
      language,
      usageNote: '',
      example: '',
      savedAt: Date.now(),
    }

    setSaving(true)
    try {
      let card = localCard
      if (supabase && user) {
        const { data, error } = await supabase
          .from('word_cards')
          .insert({ user_id: user.id, term: cleanTerm, language })
          .select('id, term, language, usage_note, example, created_at')
          .single()
        if (error) throw error
        card = {
          id: data.id,
          term: data.term,
          language: data.language === 'en' ? 'en' : 'es',
          usageNote: data.usage_note ?? '',
          example: data.example ?? '',
          savedAt: new Date(data.created_at).getTime(),
        }
        setFeedback(`«${cleanTerm}» ${copy.savedAccount}`)
      } else {
        setFeedback(`«${cleanTerm}» ${copy.savedLocal}`)
      }

      const nextCards = [card, ...cards]
      if (!supabase || !user) localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards))
      setCards(nextCards)
      setTerm('')
    } catch {
      setFeedback(copy.saveError)
    } finally {
      setSaving(false)
    }
  }

  function beginEditing(card: WordCard) {
    setEditingCardId(card.id)
    setUsageDraft(card.usageNote)
    setExampleDraft(card.example)
    setCardError(null)
    setFeedback('')
  }

  async function saveCard(event: FormEvent<HTMLFormElement>, card: WordCard) {
    event.preventDefault()
    const usageNote = usageDraft.trim()
    const example = exampleDraft.trim()
    const updatedCard = { ...card, usageNote, example }
    setSavingCardId(card.id)
    setFeedback('')

    try {
      if (supabase && user) {
        const { error } = await supabase
          .from('word_cards')
          .update({ usage_note: usageNote || null, example: example || null })
          .eq('id', card.id)
          .eq('user_id', user.id)
          .select('id')
          .single()
        if (error) throw error
      }
      const nextCards = cards.map((item) => item.id === card.id ? updatedCard : item)
      if (!supabase || !user) localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards))
      setCards(nextCards)
      setEditingCardId(null)
      setCardError(null)
    } catch {
      setCardError({ id: card.id, message: copy.editError })
    } finally {
      setSavingCardId(null)
    }
  }

  async function deleteCard(card: WordCard) {
    const confirmation = copy.deleteConfirm.replace('{term}', card.term)
    if (!window.confirm(confirmation)) return

    setDeletingCardId(card.id)
    setCardError(null)
    try {
      if (supabase && user) {
        const { error } = await supabase
          .from('word_cards')
          .delete()
          .eq('id', card.id)
          .eq('user_id', user.id)
          .select('id')
          .single()
        if (error) throw error
      }
      const nextCards = cards.filter((item) => item.id !== card.id)
      if (!supabase || !user) localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards))
      setCards(nextCards)
      if (editingCardId === card.id) setEditingCardId(null)
    } catch {
      setCardError({ id: card.id, message: copy.deleteError })
    } finally {
      setDeletingCardId(null)
    }
  }

  if (supabase && !authReady) {
    return <main className="auth-page"><p>{copy.loading}</p></main>
  }
  if (supabase && !user) {
    return <AuthView onLanguage={setInterfaceLanguage} />
  }

  return (
    <div className="app-frame">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label={copy.brandLabel}>
          <img src={logoUrl} alt="" />
          <span>palabrando</span>
        </a>
        {user && supabase && (
          <button className="signout-button" type="button" onClick={() => { if (supabase) void supabase.auth.signOut() }}>
            {copy.signOut}
          </button>
        )}
      </header>

      <main id="inicio" className="home">
        <section className="welcome" aria-labelledby="welcome-title">
          <h1 id="welcome-title">{copy.notebook}</h1>
        </section>

        <section className="notebook" aria-labelledby="capture-title">
          <div className="notebook-spine" aria-hidden="true"><span /><span /><span /></div>
          <div className="notebook-page">
            <div className="page-heading">
              <div><h2 id="capture-title">{copy.addWord}</h2></div>
            </div>

            <form className="capture-form" onSubmit={saveWord}>
              <label htmlFor="word-term">{copy.term}</label>
              <input
                id="word-term"
                autoComplete="off"
                value={term}
                onChange={(event) => {
                  setTerm(event.target.value)
                  if (feedback) setFeedback('')
                }}
              />
              <div className="capture-actions">
                <label className="language-field" htmlFor="word-language">
                  <span>{copy.language}</span>
                  <select
                    id="word-language"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value as Language)}
                  >
                    <option value="es">{copy.spanish}</option>
                    <option value="en">{copy.english}</option>
                  </select>
                </label>
                <button className="save-button" type="submit" disabled={saving}>
                  {saving ? copy.saving : copy.save}
                </button>
              </div>
              <p className="save-feedback" aria-live="polite">{feedback}</p>
            </form>
          </div>
        </section>

        <section className="library" aria-labelledby="library-title">
          <div className="section-heading">
            <h2 id="library-title">{copy.recent}</h2>
            <span className="card-count">{cards.length}</span>
          </div>

          {cardsLoading ? (
            <p className="load-feedback" aria-live="polite">{copy.loading}</p>
          ) : cards.length === 0 ? (
            <p className="empty-library">{copy.empty}</p>
          ) : (
            <ul className="card-grid">
              {cards.map((card) => (
                <li className="word-card" key={card.id}>
                  <div className="word-card-header">
                    <span className="card-language">{card.language === 'es' ? copy.spanish : copy.english}</span>
                    <span className="card-mark" aria-hidden="true" />
                  </div>
                  <h3 className="word-card-term">{card.term}</h3>

                  {editingCardId === card.id ? (
                    <form className="card-editor" onSubmit={(event) => void saveCard(event, card)}>
                      <label htmlFor={`usage-${card.id}`}>{copy.usage}</label>
                      <textarea
                        id={`usage-${card.id}`}
                        rows={2}
                        value={usageDraft}
                        onChange={(event) => setUsageDraft(event.target.value)}
                      />
                      <label htmlFor={`example-${card.id}`}>{copy.example}</label>
                      <textarea
                        id={`example-${card.id}`}
                        rows={3}
                        value={exampleDraft}
                        onChange={(event) => setExampleDraft(event.target.value)}
                      />
                      <div className="card-edit-actions">
                        <button className="card-action primary" type="submit" disabled={savingCardId === card.id}>
                          {savingCardId === card.id ? copy.savingChanges : copy.saveChanges}
                        </button>
                        <button className="card-action" type="button" onClick={() => setEditingCardId(null)}>
                          {copy.cancel}
                        </button>
                      </div>
                      {cardError?.id === card.id && <p className="card-feedback" aria-live="polite">{cardError.message}</p>}
                    </form>
                  ) : (
                    <>
                      <div className="word-card-fields">
                        {card.usageNote && <section><h4>{copy.usage}</h4><p>{card.usageNote}</p></section>}
                        {card.example && <section><h4>{copy.example}</h4><p className="card-example">{card.example}</p></section>}
                      </div>
                      <div className="card-actions">
                        <button className="card-action" type="button" onClick={() => beginEditing(card)}>{copy.edit}</button>
                        <button
                          className="card-action delete-action"
                          type="button"
                          disabled={deletingCardId === card.id}
                          onClick={() => void deleteCard(card)}
                        >
                          {copy.delete}
                        </button>
                      </div>
                      {cardError?.id === card.id && <p className="card-feedback" aria-live="polite">{cardError.message}</p>}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
