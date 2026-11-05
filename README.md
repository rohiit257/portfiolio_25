# Portfolio

This portfolio runs as a Next.js App Router application. The UI and API routes are served by the same Next.js server.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

Set the variables listed in `.env.example` to enable the admin content editor, database persistence, and Cloudinary uploads. Public portfolio content remains available with defaults when the database is not configured.
