# Peta Hirarki Website ExcelGratis

Dokumen ini adalah gambaran arsitektur informasi situs untuk review internal. Ini bukan menu atau halaman baru di website.

```mermaid
flowchart TD
  A[Beranda] --> B[Template]
  A --> C[Kategori]
  A --> D[Belajar Excel]
  A --> E[Tentang]
  A --> F[Cari Template]

  B --> B1[Semua Template]
  B --> B2[Halaman detail template]
  C --> C1[Keuangan Pribadi]
  C --> C2[Bisnis dan UMKM]
  C --> C3[Produktivitas Kerja]
  C --> C4[Pendidikan]
  C --> C5[Rumah Tangga dan Acara]

  D --> D1[Panduan]
  D --> D2[Rumus Excel]
  D --> D3[Masalah Excel]
  D --> D4[Koleksi]
  D1 --> D11[Dasar Excel]
  D1 --> D12[Pengolahan Data]
  D1 --> D13[Produktivitas]
  D2 --> D21[Matematika]
  D2 --> D22[Logika]
  D2 --> D23[Lookup dan Referensi]
  D3 --> D31[Formula]
  D3 --> D32[Format dan Data]
  D3 --> D33[File dan Kompatibilitas]

  E --> E1[Kontak]
  E --> E2[Kebijakan Editorial]
  E --> E3[Cara Kami Menguji Template]
  E --> E4[Legal dan Privasi]
```

## Jalur Pengguna Utama

1. Pengunjung yang sudah tahu kebutuhan file: `Beranda -> Template -> Kategori -> Detail Template -> Download`.
2. Pengunjung yang ingin belajar: `Beranda -> Belajar Excel -> Panduan/Rumus Excel/Masalah Excel -> Artikel`.
3. Pengunjung yang belum tahu jenis konten: `Footer -> HTML Sitemap` untuk daftar lengkap halaman publik.

## Navigasi Global

| Lokasi | Tujuan |
| --- | --- |
| Header desktop | Template, Kategori, Belajar Excel, Tentang, Cari |
| Navigasi bawah mobile | Beranda, Template, Cari, Kategori, Belajar Excel |
| Footer | Template dan kategori, Resource, Tentang, Legal, HTML Sitemap |

## Inventaris Publik Saat Ini

| Area | Isi publik |
| --- | --- |
| Template | 15 template pada Keuangan Pribadi, Bisnis dan UMKM, serta Produktivitas Kerja |
| Belajar Excel | 15 Panduan, 6 Rumus Excel, dan 6 artikel Masalah Excel |
| Koleksi | 3 koleksi resource |
| Draft | 20 template dan 15 panduan draft, sengaja tidak muncul pada route publik, navigasi, atau sitemap |

## Aturan Struktur

- `/belajar-excel/` adalah hub pembelajaran. `/panduan/`, `/rumus-excel/`, dan `/masalah-excel/` adalah arsip per jenis resource.
- Semua halaman detail harus dapat dicapai dari sebuah hub atau kategori publik.
- Konten draft tidak boleh tampil pada daftar, kartu terkait, route publik, atau sitemap.
- Saat jenis konten baru ditambahkan, peta ini dan audit discoverability perlu diperbarui sebelum rilis.
