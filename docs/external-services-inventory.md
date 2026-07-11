# External Services Inventory

| Layanan | Area | Tujuan | Data yang mungkin diproses | Sumber konfigurasi | Status |
| --- | --- | --- | --- | --- | --- |
| Cloudflare Workers/Assets | Public site | Hosting static site dan security logging infrastruktur | Request metadata dan security logs sesuai layanan | `wrangler.toml`, deployment environment | Aktif pada arsitektur produksi |
| Decap CMS + GitHub backend | Admin | Editorial workflow dan penyimpanan Markdown | Kredensial login GitHub pada alur admin | `public/admin/config.yml` | Konfigurasi tersedia; OAuth memerlukan setup owner |
| Web3Forms | Public form | Memproses pengiriman Form Kontak dan Request Template | Field formulir yang dikirim pengguna; data dapat tersedia di mailbox atau interface penyedia sesuai operasi layanan | `src/components/ContactForm.astro`, `src/lib/form-submission.mjs` | Aktif dengan konfigurasi yang sudah ada; tidak ada database formulir publik terpisah di repository; timeout client 15 detik dan honeypot aktif |
| Google Fonts | Public site | Font Inter, Plus Jakarta Sans, dan Material Symbols | Request font dan metadata browser | `src/layouts/BaseLayout.astro` | Aktif |

## Planned but inactive

- Google AdSense: tidak aktif; tidak ada script, publisher ID, atau request iklan.
- Analytics provider: tidak aktif; event layer hanya menjadi no-op atau meneruskan ke `dataLayer` bila pemilik mengaktifkan provider pada masa depan.
- hCaptcha: tidak aktif; tidak ada site key, widget, script, atau request captcha. Prosedur konfigurasi manual didokumentasikan di `docs/form-delivery.md`.
