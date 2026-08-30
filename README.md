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
   Database → Postgres (or Neon). This automatically sets the `DATABASE_URL`
   environment variable for you.
2. **Push schema to the database.** Locally (or via Vercel's deploy hook),
   run:
   ```bash
   npx prisma db push
   ```
3. **Deploy.** Vercel auto-detects Next.js — just import this repo as a
   project and click Deploy. `postinstall` runs `prisma generate`
   automatically.
4. Visit your deployment URL — it redirects `/` to `/app.html`.

## Local development

```bash
npm install
cp .env.example .env      # fill in a real DATABASE_URL
npx prisma db push
npm run dev
```

Then open http://localhost:3000
