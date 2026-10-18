# Palabrando

Aplicación web para guardar palabras interesantes y volver a ellas para incorporarlas a la escritura.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Desarrollo local

```sh
npm install
npx supabase start
npm run dev
```

El proyecto Supabase de Palabrando aplica las migraciones de `supabase/migrations`. La URL y la clave publicable se guardan en `.env.local`, ignorado por Git. `.env.example` documenta las variables necesarias sin incluir credenciales. Para trabajar contra la instancia local que inicia Supabase CLI, configura esas variables con la URL y clave que devuelve `npx supabase status -o env`.

Al trabajar contra Supabase local, el enlace de acceso enviado en desarrollo aparece en Mailpit, en `http://127.0.0.1:54324`.

Para detener los servicios locales:

```sh
npx supabase stop
```

## Compilar para producción

```sh
npm run build
npm run preview
```

El proyecto usa React, TypeScript y Vite. Las variables locales se guardan en archivos `.env.local`, que Git ignora.

## Estado del primer hito

La pantalla inicial permite anotar una palabra o expresión y consultar las notas recientes. Sin variables de Supabase usa `localStorage`; con Supabase configurado usa enlace por correo y persiste las palabras autenticadas en Postgres.
