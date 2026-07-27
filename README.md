This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Minimalist CV + Zarinpal

Create a `.env.local` with:

- `ZARINPAL_MERCHANT_ID` — your Zarinpal merchant UUID
- `ZARINPAL_SANDBOX` — `true` for sandbox (default), `false` for production
- `PAYMENT_CALLBACK_URL` — e.g. `http://localhost:3000/api/payment/zarinpal/callback`
- `DOWNLOAD_UNLOCK_SECRET` — long random string (16+ characters) for signed download cookies

Flow: home → pick a template → `/editors/{slug}` → fill form & preview → **Pay & download** → after Zarinpal verify, PNG/PDF download is unlocked for 7 days (httpOnly cookie).

## PNG template folder

1. Add PNG files to `public/templates/sources/`.
2. Optional: edit `lib/templates/templates.manifest.json` for `name`, `priceToman`, or `enabled: false`.
3. Run `npm run templates:sync` (also runs automatically before `npm run build`).
4. Commit generated WebP thumbs in `public/templates/thumbs/`, `lib/templates/catalog.generated.ts`, and `app/editors/*/page.tsx` stubs.

The homepage loads **WebP thumbnails only** (~400px wide) for fast grid performance. All similar layouts share one field schema (`lib/templates/schemas/minimalist.schema.ts`) rendered by `SchemaDrivenForm` / `SchemaWizard`.

**RTL / Arabic / Persian:** set per template in `templates.manifest.json`:

- `layout`: `minimalist` (LTR navy) or `centeredRtl` (centered design like `test.png`)
- `schemaId`: `minimalist` or `centeredRtl`
- `locale`: `ar` | `fa` | `en` (section titles on preview + forms)
- `dir`: `rtl` | `ltr`

Example: `test` uses `centeredRtl` + Arabic labels; `minimalist-cv-resume` stays `minimalist` + LTR.

Legacy `/minimalist-editor` redirects to `/editors/minimalist-cv-resume`.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
