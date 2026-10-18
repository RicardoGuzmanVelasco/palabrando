import { useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from './lib/supabase'
import type { Language } from './types'

type AuthViewProps = {
  onLanguage: (language: Language) => void
}

const labels = {
  es: {
    signIn: 'Iniciar sesión',
    signUp: 'Crear cuenta',
    email: 'Correo electrónico',
    interfaceLanguage: 'Idioma de interfaz',
    spanish: 'Español',
    english: 'Inglés',
    send: 'Enviar enlace',
    sending: 'Enviando…',
    sent: 'Enlace enviado a',
    error: 'No se pudo enviar el enlace. Inténtalo de nuevo.',
  },
  en: {
    signIn: 'Sign in',
    signUp: 'Create account',
    email: 'Email',
    interfaceLanguage: 'Interface language',
    spanish: 'Spanish',
    english: 'English',
    send: 'Send link',
    sending: 'Sending…',
    sent: 'Link sent to',
    error: 'Could not send the link. Try again.',
  },
} as const

export function AuthView({ onLanguage }: AuthViewProps) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState<Language>('es')
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState('')
  const copy = labels[language]

  async function sendLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return

    setBusy(true)
    setFeedback('')
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: mode === 'sign-up',
          emailRedirectTo: window.location.origin,
          ...(mode === 'sign-up' ? { data: { app_language: language } } : {}),
        },
      })
      if (error) throw error
      setFeedback(`${copy.sent} ${email.trim()}.`)
      onLanguage(language)
    } catch {
      setFeedback(copy.error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="auth-page">
      <header className="auth-brand">
        <img src={new URL('../design/logos/logo-comillas-agua.svg', import.meta.url).href} alt="" />
        <span>palabrando</span>
      </header>
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-tabs" role="group" aria-label={`${copy.signIn} / ${copy.signUp}`}>
          <button
            className={mode === 'sign-in' ? 'active' : ''}
            type="button"
            aria-pressed={mode === 'sign-in'}
            onClick={() => { setMode('sign-in'); setFeedback('') }}
          >
            {copy.signIn}
          </button>
          <button
            className={mode === 'sign-up' ? 'active' : ''}
            type="button"
            aria-pressed={mode === 'sign-up'}
            onClick={() => { setMode('sign-up'); setFeedback('') }}
          >
            {copy.signUp}
          </button>
        </div>
        <h1 id="auth-title">{mode === 'sign-in' ? copy.signIn : copy.signUp}</h1>
        <form className="auth-form" onSubmit={sendLink}>
          <label htmlFor="auth-email">{copy.email}</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {mode === 'sign-up' && (
            <label className="auth-language" htmlFor="interface-language">
              <span>{copy.interfaceLanguage}</span>
              <select
                id="interface-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
              >
                <option value="es">{copy.spanish}</option>
                <option value="en">{copy.english}</option>
              </select>
            </label>
          )}
          <button className="save-button" type="submit" disabled={busy}>
            {busy ? copy.sending : copy.send}
          </button>
          <p className="save-feedback" aria-live="polite">{feedback}</p>
        </form>
      </section>
    </main>
  )
}
