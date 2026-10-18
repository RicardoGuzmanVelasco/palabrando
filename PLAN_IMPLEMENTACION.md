# Palabrando — plan de implementación y brief de dirección de arte

## 1. Objetivo

Palabrando convierte palabras interesantes encontradas durante el día en **cartas** que el usuario puede retomar después para incorporarlas a su escritura cotidiana.

La misma persona ocupa dos roles:

- **Lector:** anota una palabra sobre la marcha, con la menor fricción posible.
- **Escritor:** vuelve con calma, completa cartas con IA y pide una consigna para usar una palabra en un texto externo.

La experiencia es **mobile-first**. Escritorio es una adaptación secundaria.

## 2. Decisiones acordadas

- La captura permite guardar solo palabra o expresión. No se guarda contexto de captura.
- Captura: metáfora de cuaderno de bolsillo/de campo, con lettering cuidado como acento.
- Práctica: cartas verticales/baraja. Los dados ilustrados y el juego narrativo pueden aparecer en los concepts.
- Completar cartas con IA es una función central del producto, con revisión y aceptación campo a campo.
- Una carta tiene palabra, idioma, uso/matiz, ejemplo, etiquetas morfológicas y autor que la añadió.
- Logo aprobado: las dos comillas en yin-yang abierto, separación 02 Equilibradas, parametrizado en `design/logos/logo-comillas.svg` con dos colores. La propuesta anterior de P con Hebra se conserva como exploración.
- El SVG del logo usa por defecto gris carbón `#343434` y gris medio `#777777`; sus dos colores son parametrizables.
- Copy de interfaz: usar solo texto estrictamente necesario para cubrir los requisitos de acción, estado y recuperación. No inventar slogans ni frases de ambientación; evitar copy redundante. Si una cadena imprescindible es dudosa, preguntar al usuario antes de decidirla. Esta regla también está en `AGENTS.md`.
- El mismo logo aparecerá en los cuatro elementos asociados a las cuatro paletas, usando en cada uno los dos tonos de su familia cromática.
- La identidad usará cuatro familias cromáticas: terracota + arcilla, ocre + papel miel, agua + papel claro y ciruela + malva. Sus valores completos se conservan en `design/PALETAS.md`.
- El tema de color de una carta se deriva de su primera etiqueta morfológica según orden de asignación. Tres familias se repartirán entre etiquetas principales; la familia agua + papel claro queda reservada para el cuaderno de captura. La tabla exacta de etiquetas y las otras tres familias se asignarán al cerrar el catálogo.
- Acceso inicial: enlace por correo. El alta pide idioma de interfaz (español o inglés); el perfil y las palabras viven en Supabase cuando hay sesión autenticada.
- Home y superficies genéricas se construyen con estas cuatro familias, sus papeles claros y sus tintas legibles. No se incorporan familias verdes, pizarra o sepia.
- No se guarda un estado manual de completitud: se calcula por los campos presentes.
- El idioma de la interfaz y los idiomas en que el usuario quiere mejorar su escritura son ajustes separados.
- Se pidió sustituir la handwritten del cuaderno por Indie Flower (Google Fonts); pendiente verificar cobertura de caracteres/licencia e incorporarla después del trabajo actual.
- Al crear una cuenta se elige idioma de interfaz: español o inglés.
- El reto conserva el último idioma elegido; en una cuenta nueva se inicia con el idioma de interfaz. Se puede cambiar antes de consultar cartas y esa selección filtra la baraja por idioma.
- Los retos serán un placeholder sencillo en el POC. No cerraremos aún reglas de selección, dados ni gamificación.
- No se implementarán tests automáticos. Se hará verificación manual.

## 3. Flujos de usuario

### A. Lector: captura inmediata

1. Abrir la web en móvil.
2. Escribir palabra o expresión en un campo preparado para recibir foco.
3. Guardar con una acción.
4. Ver una confirmación discreta y poder seguir anotando.

No pedir uso, ejemplo, contexto ni etiquetas en esta fase. El idioma de la carta se preselecciona para evitar pasos extra y se puede cambiar rápidamente. Propuesta inicial: idioma principal de escritura; si no está configurado, el idioma de interfaz.

### B. Preparar carta con IA

1. Abrir una carta pendiente desde la bandeja.
2. Pulsar **Completar con IA**.
3. Recibir propuesta de uso/matiz, ejemplo y etiquetas morfológicas.
4. Revisar, editar y aceptar cada campo.

La IA no escribe directamente sobre la carta sin aprobación. Si detecta varios sentidos o no tiene seguridad suficiente, presenta opciones claras. La respuesta debe ser estructurada y validada antes de mostrarse.

### C. Escritor: reto placeholder

1. Mostrar el idioma del reto, conservando la última elección del usuario.
2. Permitir cambiarlo antes de consultar cartas.
3. Consultar cartas listas del idioma seleccionado.
4. Elegir una carta o probar un sorteo sencillo.
5. Mostrar una consigna provisional para aplicar la palabra a un texto externo.
6. Marcar el reto como incorporado, pendiente o descartado.

Si no hay cartas listas, explicar por qué y ofrecer cambiar idioma o completar cartas de ese idioma. No recurrir silenciosamente a cartas de otro idioma. No guardar el texto que el usuario está escribiendo.

En el POC no hacen falta dados funcionales, combinación compleja, rachas, puntos, niveles, ranking ni generación sofisticada de retos.

## 4. Idiomas

Mantener separados:

1. **Idioma de interfaz:** español o inglés, elegido al crear cuenta.
2. **Idiomas de escritura:** lista que el usuario configura según lo que quiere practicar.
3. **Idioma de carta:** idioma de la palabra o expresión.
4. **Idioma de reto:** última elección persistida; inicialmente toma el idioma de interfaz.

El idioma del reto se muestra antes del filtro de cartas. Al cambiarlo, se guarda la nueva preferencia y se consultan solo cartas listas que coincidan. La app puede empezar usando español e inglés, pero el esquema no debe codificar que solo existe español.

## 5. Modelo de datos inicial

Los nombres definitivos se ajustan al crear migraciones.

### `profiles`

- `id`: UUID del usuario autenticado.
- `app_language`.
- `writing_languages`.
- `last_challenge_language`.
- Fechas de creación y actualización.

### `word_cards`

- `id`, `user_id`.
- `added_by`: quien añadió la palabra al glosario; se asigna desde la sesión, no lo escribe el usuario.
- `term`: palabra o expresión.
- `language`.
- `usage_note`: uso o matiz.
- `example`.
- Fechas de creación y actualización.

No añadir contexto de captura.

### Etiquetas morfológicas

Catálogo con códigos estables y nombres traducibles, más relación muchos-a-muchos con cartas. Una carta admite más de una etiqueta. La relación conserva el orden en que se asignaron las etiquetas (`assigned_order` o equivalente) para que la primera etiqueta determine el tema de color de forma estable.

### `challenges` — mínimo

- `id`, `user_id`.
- `language`.
- `prompt`.
- `status`: pendiente, incorporado o descartado.
- Fechas de creación y resolución.

Una tabla de relación puede vincular el reto con sus cartas; en la primera versión se usa una sola. Si “incorporado” necesita indicar quién usó la palabra en el texto, registrar `completed_by` en el evento/reto, separado de `added_by`.

### Completitud de carta

- **Pendiente:** faltan campos requeridos (uso/matiz, ejemplo o etiqueta).
- **Lista:** los campos requeridos están completos.

Calcularlo desde los datos; no mantener un estado manual que pueda contradecirlos. Si luego se necesita archivar, será una acción independiente.

## 6. Arquitectura propuesta

- **Frontend:** React + TypeScript + Vite, aplicación web adaptable y mobile-first.
- **Hosting:** Render Static Site.
- **Auth y datos:** Supabase Auth + Postgres.
- **Seguridad:** RLS en todas las tablas expuestas; filas accesibles solo al usuario propietario. La clave pública de Supabase puede estar en frontend; nunca exponer service-role ni secretos.
- **IA:** función de servidor (por ejemplo, Supabase Edge Function) que verifica sesión, recibe término/idioma y devuelve propuestas tipadas. La clave del proveedor vive como secreto del servidor.
- **MCP:** no es necesario para el POC. La web usa una llamada protegida a una función de servidor; MCP podría añadirse luego para conexión con asistentes externos.
- **Exportación:** CSV del glosario cuando captura y edición estén estables.

Antes de implementar, verificar la documentación y el changelog vigentes de Supabase (Auth, RLS, Data API, Edge Functions). Antes de desplegar, verificar configuración vigente de Render Static Sites, rutas SPA, variables y dominio.

## 7. Estado de los hitos

- **Fase 0 — base y remoto:** skeleton Vite/React/TypeScript, README, `.gitignore`, dependencias instaladas y commit inicial. Repositorio público `RicardoGuzmanVelasco/palabrando`, rama `main`.
- **Fase 1 — primera pasada:** nombre, logo equilibrado, cuatro paletas y SVG paramétrico aprobados. La primera pantalla móvil usa provisionalmente la estructura editorial de Patio con colores aprobados. El catálogo de etiquetas y su relación con paletas sigue pendiente.
- **Captura inicial:** permite anotar y consultar palabras recientes; con sesión autenticada las guarda en Supabase y, sin configuración, conserva el respaldo local del navegador.
- **Fase 2 — Supabase y cuenta:** proyecto remoto `palabrando` creado en `eu-central-1`; migraciones de perfil, cartas, catálogo de etiquetas y retos aplicadas; `.env.local` apunta al proyecto y está ignorado por Git. RLS está activado en las siete tablas y el asesor de seguridad no reporta avisos. El dominio de producción está en Redirect URLs. Pendiente confirmar Site URL predeterminado y comprobar aislamiento entre dos cuentas.
- **Fase 3 — captura y glosario (en curso):** captura y lectura persistentes, cartas verticales y edición/borrado de uso y ejemplo implementados. Pendientes catálogo y asignación de etiquetas, estados pendiente/lista y configurar idiomas de escritura/preselección.
- **Fase 6 — publicación (en curso):** primera versión publicada en Render Static Site: `https://palabrando-t3rt.onrender.com`. Compilación de producción correcta; pendiente verificar Auth con el Site URL definitivo y cerrar la verificación manual.

## 8. Secuencia de implementación

### Fase 0 — Git y skeleton

1. Crear repo local en la carpeta Palabrando.
2. Añadir `.gitignore` antes de dependencias: `node_modules`, `dist`, `.env*` (permitiendo `.env.example`), secretos, logs, archivos de sistema operativo.
3. Hacer commit inicial en `main`.
4. Crear repo en GitHub, enlazar remoto y subir `main`.
5. Crear skeleton Vite/React/TypeScript, README con setup y ejecución local.

### Fase 1 — Dirección de arte

1. Encargar tres concepts con el brief al final de este documento.
2. Aplicar el SVG parametrizable del logo aprobado en las cuatro familias cromáticas y preparar la versión compacta a una tinta.
3. Comparar las mismas escenas móviles y elegir una dirección.
4. Conservar las cuatro paletas de `design/PALETAS.md`; decidir qué tres se asignan a las etiquetas morfológicas y cuál queda para el cuaderno.
5. Fijar tipografía, espaciado, cartas, botones, iconos y movimiento.
6. Escritorio adapta el sistema decidido en móvil.

### Fase 2 — Supabase y cuenta

1. Crear proyecto Supabase y configurar variables locales sin subir secretos.
2. Crear migraciones para perfil, cartas, etiquetas y retos.
3. Configurar Auth con elección inicial de español/inglés.
4. Activar RLS y verificar las políticas de lectura/escritura.
5. Guardar idiomas de escritura y última elección del reto.

### Fase 3 — Captura y glosario

1. Implementar captura rápida y persistente.
2. Implementar bandeja de cartas pendientes/listas.
3. Permitir ver, editar y borrar cartas.
4. Añadir idioma de carta con preselección y cambio rápido.
5. Añadir etiquetas morfológicas múltiples.

### Fase 4 — Completar cartas con IA

1. Implementar función de servidor y validación de sesión.
2. Definir salida estructurada de uso, ejemplo y etiquetas.
3. Mostrar propuestas editables y requerir aceptación explícita.
4. Manejar ambigüedad, errores y reintentos sin perder cambios del usuario.
5. Confirmar que no se filtran secretos en el bundle del frontend.

### Fase 5 — Reto placeholder

1. Mostrar el último idioma de reto y permitir cambiarlo.
2. Persistir el cambio.
3. Filtrar cartas listas en la consulta por idioma.
4. Implementar una consigna sencilla para una carta.
5. Guardar resultado básico del reto.

### Fase 6 — Verificación manual y publicación

1. Revisar móvil primero y escritorio después.
2. Verificar teclado, áreas táctiles, contraste, guardado, errores y estados sin cartas.
3. Verificar RLS con dos cuentas: sin acceso cruzado.
4. Verificar exportación CSV y ausencia de secretos.
5. Desplegar en Render y comprobar rutas, variables y URL publicada.

No añadir tests automáticos en el POC. Dejar anotada una lista de comprobaciones manuales realizadas.

## 9. Criterios de aceptación

- Guardar una palabra en móvil lleva pocos segundos y no exige completar la carta.
- Las cartas persisten en Supabase.
- El idioma de interfaz se elige en el alta y los idiomas de escritura se configuran aparte.
- La IA propone campos y no los guarda sin aceptación.
- El idioma de reto conserva la última elección, se puede cambiar antes de filtrar y restringe cartas por idioma.
- El reto dirige a escritura externa y no guarda el manuscrito.
- RLS protege datos entre cuentas.
- Hay exportación CSV.
- La web funciona en móvil y está publicada en Render.
- La identidad visual expresa el cuaderno de bolsillo y la baraja de escritura sin sacrificar legibilidad.

## 10. Fuera del POC

Editor de textos; automatización de captura mientras se lee; dados funcionales; retos con múltiples cartas; gamificación con puntos/rachas; integración MCP; pruebas automáticas.

## 11. Brief listo para el agente de dirección de arte

> Eres director/a de arte y diseñador/a de producto digital. Crea conceptos visuales para Palabrando, una aplicación para recoger palabras interesantes y volver a ellas para incorporarlas a la escritura cotidiana.
>
> **Idea central:** un cuaderno de bolsillo/de campo que, al retomarlo con calma, se convierte en una baraja de cartas para escribir. El apunte pasa a ser carta. Deben sentirse dos ritmos: captura inmediata y exploración pausada.
>
> **Prioridad:** mobile-first. Diseña primero para móvil, alrededor de 390 × 844 px. Escritorio es secundario: muestra cómo se adapta el sistema ya definido en móvil.
>
> **Entrega tres direcciones artísticas distintas**, cada una coherente con ambas metáforas. Puedes explorar: cuaderno editorial con impresión artesanal; diario de campo naturalista con taxonomía visual; cuaderno contemporáneo de escritor con cartas gráficas de coleccionista. Mantén la misma arquitectura de escenas para compararlas.
>
> **Muestra en cada dirección:**
>
> 1. Captura móvil inmediata: palabra, campo de entrada y gesto de guardar.
> 2. Bandeja de cartas pendientes.
> 3. Carta con propuestas de IA para uso, ejemplo y etiquetas, revisables antes de aceptar.
> 4. Idioma de reto con opción de cambiarlo antes de filtrar cartas.
> 5. Baraja filtrada, carta sacada y dados ilustrados como visión futura.
> 6. Estado sin cartas disponibles para el idioma elegido.
>
> **Cuaderno:** lettering cuidado para títulos o apuntes breves; máxima legibilidad en controles y contenido. No pedir contexto de captura.
>
> **Baraja:** cartas verticales con el término como protagonista; diseña frente y reverso, uso, ejemplo e insignias morfológicas. Explora animaciones breves para guardar, transformar apunte en carta, barajar, sacar carta y lanzar dados.
>
> **Idiomas:** diferencia idioma de interfaz, idiomas de escritura, idioma de cada carta e idioma persistente del reto. El selector de idioma aparece antes de mostrar las cartas.
>
> **Tono:** artesanal, preciso y contemporáneo, con detalle intencional. La metáfora orienta el diseño sin convertir la interfaz en una simulación pesada de papel.
>
> **Evita:** plantilla SaaS, dashboard genérico, gradientes decorativos, textura excesiva, texto pequeño manuscrito, ornamento sin función, gamificación infantil y puntos/rachas.
>
> Para cada dirección entrega nombre, frase de personalidad, paleta y función de color, tipografías y jerarquías, tratamiento de lettering, cartas, dados e iconos, reglas móviles, adaptación a escritorio, transiciones y estados vacíos/errores. Termina recomendando una dirección y qué rescatarías de las otras dos.
>
> No programes la aplicación. Produce concepts y reglas suficientemente concretas para que un agente de implementación pueda construirlos fielmente.
