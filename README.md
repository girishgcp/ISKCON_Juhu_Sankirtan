# ISKCON Juhu Sankirtan — Receipt Generator

Digital version of the ISKCON Book Distribution receipt book. Generates
Customer/Account/Book copies, PDF and image export, print-all-3-on-one-A4,
and stores every receipt in a shared Postgres database via Prisma.

## Structure

- `public/app.html` — the receipt generator UI (plain HTML/JS, no build step)
- `app/api/receipts/route.js` — GET (list) / POST (create or update) a receipt
- `app/api/counter/route.js` — GET / PUT the shared next-receipt-number counter
- `prisma/schema.prisma` — `Receipt` and `Counter` models

## Deploy on Vercel

1. **Add a Postgres database.** In your Vercel project → Storage tab → Create
   Database → Postgres (or Neon). This automatically sets a database URL
   environment variable — note the exact name it uses (Vercel often prefixes
   it, e.g. `database_DATABASE_URL`) and also add a plain `DATABASE_URL`
   variable with the same value, since `schema.prisma` reads that exact name.
2. **Set a shared access PIN.** Add an environment variable `ACCESS_PIN` with
   whatever PIN you want your team to use to unlock the app. Every page and
   API route is gated behind it via `middleware.js`.
3. **Push schema to the database.** Locally (or via Vercel's deploy hook),
   run:
   ```bash
   npx prisma db push
   ```
4. **Deploy.** Vercel auto-detects Next.js — just import this repo as a
   project and click Deploy. `postinstall` runs `prisma generate`
   automatically.
5. Visit your deployment URL — it'll prompt for the PIN, then redirect to
   `/app.html`.

## Local development

```bash
npm install
cp .env.example .env      # fill in a real DATABASE_URL
npx prisma db push
npm run dev
```

Then open http://localhost:3000
