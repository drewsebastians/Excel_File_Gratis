# Resource Content Architecture

Batch 2 menyediakan empat tipe resource tanpa menambah konten publik: Panduan (`/panduan/`), Rumus Excel (`/rumus-excel/`), Masalah Excel (`/masalah-excel/`), dan Koleksi (`/koleksi/`). Panduan, rumus, dan masalah memakai URL kategori lalu slug; koleksi memakai slug langsung.

Semua content collection memakai metadata SEO, `date`, `updated_date`, `draft`, `featured`, dan relation field opsional. Resource published saja yang muncul di hub, kategori, navigasi, structured data, dan sitemap. Target relasi yang hilang diabaikan agar build tidak gagal. Prioritas related resource adalah relasi eksplisit, kategori sama, lalu tag sama; tidak ada pengisian slot yang tidak relevan.

Hub kosong tetap dapat dibuka sebagai jalur kembali ke Template dan Kategori, namun `noindex, follow`, tidak masuk sitemap, tidak tampil di navigation, dan tidak memiliki AdSlot. Ketika resource pertama dipublikasikan, hub serta kategori/detail yang memiliki konten otomatis indexable dan dapat masuk navigation.

Kategori berarti pengelompokan metadata di dalam tipe resource. Koleksi adalah landing page kurasi lintas resource berdasarkan tujuan pengguna. Batch 2 tidak menambahkan artikel massal agar kualitas dan review tidak digantikan oleh volume.

Untuk menambah konten masa depan, buat entry dari Decap CMS, pilih kategori yang tervalidasi, isi metadata SEO, gunakan slug stabil, tandai draft selama review, lalu pastikan semua relasi menunjuk resource yang sudah published. AdSlot masa depan hanya layak pada detail resource published yang substantif, tidak pada hub kosong, legal page, form, atau di dekat kontrol penting.

## Model tipe

`src/lib/resources.ts` memetakan setiap `ResourceKind` ke `CollectionEntry` Astro yang sesuai. `ResourceEntries` mempertahankan tipe tiap collection, sedangkan `ResolvedRelatedResource` adalah discriminated union berdasarkan `kind`. Helper publik menerima union atau mapping tersebut dan tidak mengekspos `any`.

Validasi slug dipusatkan pada `resourceSlugPattern`. Kategori artikel berasal langsung dari `resourceCategories`, sehingga schema, URL builder, category helper, dan fixture memakai sumber nilai yang sama. Loader Markdown memakai tipe `Loader` resmi Astro; data mentah tetap melewati `context.parseData` sebelum disimpan dan digunakan helper publik.

## Resolusi relasi

Resolver membaca relasi eksplisit satu tingkat dan tidak memanggil dirinya sendiri. Karena itu relasi melingkar seperti A ke B lalu B ke A tidak dapat menyebabkan rekursi tanpa batas. Pasangan `kind:slug` disimpan dalam `Set`, sehingga duplikasi di CMS hanya menghasilkan satu kartu.

Target yang hilang, tidak valid, atau masih draft dilewati tanpa membentuk link mati. Untuk artikel, fallback hanya memakai resource published dari collection yang sama dengan kategori atau tag yang relevan. Koleksi hanya memakai relasi eksplisit dan tidak diisi dengan fallback yang tidak relevan. Section terkait tidak dirender bila hasil akhirnya kosong.

Detail fixture non-publik dan prosedur pengujian tersedia di `docs/resource-fixture-testing.md`.
