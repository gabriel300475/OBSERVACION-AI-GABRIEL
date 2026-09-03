# Observador NEM

Aplicación React + Vite en JavaScript para registrar observaciones de aula alineadas con el enfoque de la Nueva Escuela Mexicana.

## Desarrollo

```bash
npm install
npm run dev
```

La aplicación usa Supabase Auth con correo y contraseña. Las observaciones se almacenan en la tabla `observations` y quedan aisladas por usuario mediante Row Level Security.

## Configurar Supabase

1. Crea un proyecto en Supabase y copia `.env.example` como `.env`.
2. Completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con los valores de **Project Settings > API**.
3. Ejecuta el contenido de `supabase-schema.sql` en el SQL Editor de Supabase.
4. En **Authentication > Providers > Email**, habilita Email. Para desarrollo puedes desactivar la confirmación de correo o confirmar las cuentas desde el panel.

La contraseña nunca se guarda en esta aplicación; Supabase gestiona las credenciales y la sesión.

## Producción

```bash
npm run build
npm run preview
```
