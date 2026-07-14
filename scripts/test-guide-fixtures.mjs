import assert from "node:assert/strict";

const rows = [
  { id: "INV-001", customer: "Toko Melati", total: 70000 },
  { id: "INV-002", customer: "Toko Sari", total: 24000 },
  { id: "INV-003", customer: "Toko Melati", total: 50000 },
];
const filter = (data, customer) => data.filter((row) => row.customer === customer);
assert.deepEqual(filter(rows, "Toko Melati").map((row) => row.id), ["INV-001", "INV-003"]);
assert.equal(filter(rows, "Tidak Ada").length, 0, "FILTER no-result fallback must be possible");

const qty = 3; const price = 25000; const discount = 5000;
assert.equal((qty * price) - discount, 70000, "LET sample calculation");
assert.deepEqual([...new Set(["Toko Melati", "Toko Sari", "Toko Melati"])].sort(), ["Toko Melati", "Toko Sari"], "UNIQUE/SORT sample");
assert.deepEqual("BRG-01|Buku Tulis|ATK".split("|"), ["BRG-01", "Buku Tulis", "ATK"], "TEXTSPLIT sample");

const validation = (value, values) => value !== "" && values.filter((item) => item === value).length === 1;
assert.equal(validation("INV-004", ["INV-001", "INV-002", "INV-003", "INV-004"]), true, "custom validation accepts unique ID");
assert.equal(validation("INV-002", ["INV-001", "INV-002", "INV-002"]), false, "custom validation rejects duplicate ID");

const append = (a, b) => [...a, ...b];
assert.equal(append([{ month: "Jan" }], [{ month: "Feb" }]).length, 2, "Append adds rows");
const merge = (sales, products) => sales.map((sale) => ({ ...sale, ...products.find((product) => product.id === sale.productId) }));
assert.equal(merge([{ productId: "P1" }], [{ id: "P1", category: "ATK" }])[0].category, "ATK", "Merge adds attributes by key");
const unpivot = [{ product: "Kopi", month: "Jan", value: 10 }, { product: "Kopi", month: "Feb", value: 12 }];
assert.equal(unpivot.length, 2, "Unpivot produces one row per period");

console.log("Guide formula and Power Query fixtures passed.");
