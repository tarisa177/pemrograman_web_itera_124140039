
const daftarBarang = [
  { nama: "Buku", kategori: "Alat Tulis", harga: 10000 },
  { nama: "Pensil", kategori: "Alat Tulis", harga: 3000 },
  { nama: "Tas", kategori: "Aksesori", harga: 75000 },
  { nama: "Pulpen", kategori: "Alat Tulis", harga: 5000 },
  { nama: "Topi", kategori: "Aksesori", harga: 25000 }
];

const daftarNilai = [
  { nama: "Andi", nilai: 80 },
  { nama: "Budi", nilai: 90 },
  { nama: "Citra", nilai: 85 },
  { nama: "Dina", nilai: 75 }
];

// 1. Mengelompokkan data menggunakan reduce()
function demoGroupBy() {
  const hasil = daftarBarang.reduce((kelompok, barang) => {
    const kategori = barang.kategori;

    if (!kelompok[kategori]) {
      kelompok[kategori] = [];
    }

    kelompok[kategori].push(barang.nama);
    return kelompok;
  }, {});

  document.getElementById("hasil1").textContent =
    JSON.stringify(hasil, null, 2);
}

// 2. Menghitung rata-rata dari array objek
function demoRataRata() {
  const total = daftarNilai.reduce(
    (jumlah, siswa) => jumlah + siswa.nilai,
    0
  );

  const rataRata = total / daftarNilai.length;

  document.getElementById("hasil2").textContent =
    "Jumlah siswa: " + daftarNilai.length +
    "\nTotal nilai: " + total +
    "\nRata-rata nilai: " + rataRata;
}

// 3. Mengubah array bersarang menjadi array datar
function demoFlatten() {
  const arrayBersarang = [1, [2, 3], [[4, 5], 6], [7, 8]];

  const hasil = arrayBersarang.flat(Infinity);

  document.getElementById("hasil3").textContent =
    "Array awal: " + JSON.stringify(arrayBersarang) +
    "\nArray setelah flat: " + JSON.stringify(hasil);
}

// 4. Menggabungkan filter, map, dan reduce
function demoAnalisis() {
  const barangMahal = daftarBarang
    .filter(barang => barang.harga >= 10000)
    .map(barang => ({
      nama: barang.nama,
      harga: barang.harga
    }));

  const totalHarga = barangMahal.reduce(
    (total, barang) => total + barang.harga,
    0
  );

  document.getElementById("hasil4").textContent =
    "Barang dengan harga minimal Rp10.000:\n" +
    JSON.stringify(barangMahal, null, 2) +
    "\nTotal harga: Rp" + totalHarga;
}
