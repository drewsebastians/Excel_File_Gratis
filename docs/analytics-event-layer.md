# Analytics Event Layer

Batch 1 menyiapkan event layer ringan tanpa memasang Google Analytics, pixel, cookie, atau script pihak ketiga.

Utility ada di `src/components/EventLayer.astro` dan tersedia sebagai `window.ExcelGratisEvents.push(eventName, params)`.

Default behavior:

- Tidak mengirim network request.
- Tidak membuat atau membaca cookie.
- Tidak menyimpan personal data.
- Aman jika tidak ada analytics provider.
- Jika `window.dataLayer` tersedia pada masa depan, event akan diteruskan dengan `dataLayer.push(...)`.

Event yang sudah dipersiapkan:

- `template_search`
- `template_filter`
- `template_sort`
- `template_card_click`
- `template_download_click`
- `related_template_click`
- `category_click`
- `contact_form_start`, `contact_form_submit`, `contact_form_success`, `contact_form_error`
- `request_template_start`, `request_template_submit`, `request_template_success`, `request_template_error`
- `guide_card_click`, `formula_card_click`, `troubleshooting_card_click`, `collection_card_click`, `related_resource_click`

Parameter harus tetap non-personal, misalnya:

- `templateSlug`
- `categorySlug`
- `format`
- `sort`
- `resultCount`

Jangan mengirim query pencarian mentah, nama pengguna, email, nomor telepon, IP address, atau data personal lain.

Form events hanya menyatakan tahap interaksi. Jangan memasukkan isi form, nama, email, subject, request, atau data personal pada parameter event.

Untuk menghubungkan analytics di masa depan, tambahkan provider di luar Batch 1 yang membuat `window.dataLayer` sebelum event terjadi. Jangan mengaktifkan provider analytics, cookie consent, atau third-party script tanpa approval eksplisit.
