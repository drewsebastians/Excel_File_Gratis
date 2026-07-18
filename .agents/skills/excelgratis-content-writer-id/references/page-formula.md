# Formula Page Playbook

## Primary intent

`reference + instructional`.

## Recommended structure

1. Fungsi singkat
2. Syntax
3. Arti setiap argumen
4. Contoh data
5. Formula
6. Hasil
7. Variasi penggunaan
8. Error umum
9. Formula terkait

## Rules

- Gunakan nama formula dan pemisah argumen secara konsisten.
- Jelaskan perbedaan koma dan titik koma bila relevan.
- Jangan mengklaim formula tersedia pada semua versi.
- Contoh harus dapat dihitung dan hasilnya benar.
- Tampilkan formula dalam code formatting.
- Bedakan exact match, approximate match, array behavior, atau spill behavior jika relevan.
- Jelaskan error berdasarkan penyebab, bukan hanya definisi error.
- Jangan mengulang definisi formula pada setiap section.

## Example pattern

```markdown
## Contoh

Jika A2 berisi nilai penjualan dan B2 berisi target:

`=IF(A2>=B2,"Tercapai","Belum")`

Hasilnya `Tercapai` ketika penjualan sama dengan atau lebih besar dari target.
```
