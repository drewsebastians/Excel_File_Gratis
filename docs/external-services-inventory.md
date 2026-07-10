# External Services Inventory

| Layanan | Area | Tujuan | Data yang mungkin diproses | Sumber konfigurasi | Status |
| --- | --- | --- | --- | --- | --- |
| Cloudflare Workers/Assets | Public site | Hosting static site dan security logging infrastruktur | Request metadata dan security logs sesuai layanan | `wrangler.toml`, deployment environment | Aktif pada arsitektur produksi |
| Decap CMS + GitHub backend | Admin | Editorial workflow dan penyimpanan Markdown | Kredensial login GitHub pada alur admin | `public/admin/config.yml` | Konfigurasi tersedia; OAuth memerlukan setup owner |
| Web3Forms | Public form | Memproses pengiriman Kontak dan Request Template | Field formulir yang dikirim pengguna | `src/components/ContactForm.astro` | Aktif dengan konfigurasi yang sudah ada |
| Google Fonts | Public site | Font Inter, Plus Jakarta Sans, dan Material Symbols | Request font dan metadata browser | `src/layouts/BaseLayout.astro` | Aktif |

## Planned but inactive

- Google AdSense: tidak aktif; tidak ada script, publisher ID, atau request iklan.
- Analytics provider: tidak aktif; event layer hanya menjadi no-op atau meneruskan ke `dataLayer` bila pemilik mengaktifkan provider pada masa depan.
