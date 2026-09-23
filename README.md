# ISKCON Juhu Sankirtan — Receipt Generator

Digital version of the ISKCON Book Distribution receipt book. Generates
Customer/Account/Book copies, PDF and image export, print-all-3-on-one-A4,
and stores every receipt in a shared Postgres database via Prisma.

Receipt numbers follow `<sequence>-<FYyear>` (e.g. `1-2026` for the first
receipt of the fiscal year running April 2026 – March 2027). The sequence
resets to 1 at the start of each new fiscal year, tracked per-FY in the
`Counter` table.

## Structure

- `public/app.html` — the receipt generator UI (plain HTML/JS, no build step)
- `public/pin.html` — general access PIN entry page
- `middleware.js` — gates every page/route behind the general access PIN
- `app/api/receipts/route.js` — GET (list) / POST (create or update) a receipt
- `app/api/counter/route.js` — GET `?fy=YYYY` / PUT the per-fiscal-year receipt counter
- `app/api/auth/route.js` — general access PIN check (sets `iskcon_pin_ok` cookie)
- `app/api/auth-accounts/route.js` — separate Accounts-team PIN check (sets
  `iskcon_accounts_ok` cookie). The "Payment confirmed by Accounts" section
  in the UI only appears once this cookie is set — it stays hidden behind a
  small "Unlock" prompt otherwise.
- `prisma/schema.prisma` — `Receipt` and `Counter` models

## Deploy on Vercel

1. **Add a Postgres database.** In your Vercel project → Storage tab → Create
   Database → Postgres (or Neon). This automatically sets a database URL
   environment variable — note the exact name it uses (Vercel often prefixes
   it, e.g. `database_DATABASE_URL`) and also add a plain `DATABASE_URL`
   variable with the same value, since `schema.prisma` reads that exact name.
2. **Set two PINs:**
   - `ACCESS_PIN` — the general PIN your whole team uses to unlock the app.
   - `ACCOUNTS_PIN` — a separate PIN only your Accounts team should have. It
     unlocks the "Payment confirmed by Accounts" toggle, which is otherwise
     hidden. Use a different value from `ACCESS_PIN`.
3. **Push schema to the database.** Locally (or via Vercel's deploy hook),
   run:
   ```bash
   npx prisma db push
   ```
4. **Deploy.** Vercel auto-detects Next.js — just import this repo as a
   project and click Deploy. `postinstall` runs `prisma generate`
   automatically.
5. Visit your deployment URL — it'll prompt for the general PIN, then
   redirect to `/app.html`. Accounts-team members additionally unlock the
   confirmation section from within the page using `ACCOUNTS_PIN`.

## Local development

```bash
npm install
cp .env.example .env      # fill in a real DATABASE_URL
npx prisma db push
npm run dev
```

Then open http://localhost:3000
