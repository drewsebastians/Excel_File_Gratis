# Release Observation Framework

## Observation Window

Wave 1 mulai diamati sejak 2026-07-14 setelah deployment commit `fe85aae` dan smoke-fix commit `fd33f2f`. Snapshot repository dan HTTP publik dapat diperbarui kapan saja; metrik Search Console dan mailbox hanya diisi owner.

## Release Health

Release sehat bila route publik mengembalikan HTTP 200, canonical dan metadata tersedia, resource tercantum di sitemap, robots mengarah ke sitemap, download tetap tersedia, dan tidak ada draft route yang terbuka. `pnpm run observe:release` menyimpan bukti teknis ke `docs/qa/release-observation.json`.

## Gate Wave Berikutnya

Wave berikutnya ditahan bila ada route hilang, canonical salah, broken link, draft leakage, kategori tipis, workbook QA gagal, preview hilang, atau editorial/owner gate belum selesai. Resource sensitif finance, HR, payroll, procurement, tax, legal, accounting, compliance, dan customer data tetap membutuhkan review owner.

## Rollback

Rollback dilakukan dengan revert publication commit pada branch baru, mengembalikan `draft: true`, menjalankan check/build/validate, memastikan URL resource kembali 404 dan hilang dari sitemap, lalu merge melalui workflow deployment resmi. Jangan menghapus workbook atau preview asset; cukup batalkan status publikasinya.

## Bukti Owner

Search Console, statistik download, traffic, mailbox delivery, OAuth, dan hasil browser runtime tidak boleh ditebak. Nilai tersebut tetap `pending_owner` sampai owner memasukkan bukti dashboard atau mailbox.
