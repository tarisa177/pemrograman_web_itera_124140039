
const angka = [1, 2, 3, 4, 5, 6];

const pengguna = [
  { nama: "Andi", umur: 25, aktif: true },
  { nama: "Budi", umur: 30, aktif: false },
  { nama: "Citra", umur: 22, aktif: true },
  { nama: "Dina", umur: 28, aktif: true }
];

// 1. map, filter, dan find
function demoMapFilterFind() {
  const angkaDikaliDua = angka.map(n => n * 2);
  const angkaGenap = angka.filter(n => n % 2 === 0);
  const penggunaBudi = pengguna.find(p => p.nama === "Budi");

  document.getElementById("hasil1").textContent =
    "Map (dikali 2): " + JSON.stringify(angkaDikaliDua) +
    "\nFilter (angka genap): " + JSON.stringify(angkaGenap) +
    "\nFind (Budi): " + JSON.stringify(penggunaBudi);
}

// 2. reduce
function demoReduce() {
  const total = angka.reduce((jumlah, n) => jumlah + n, 0);
  const rataRata = total / angka.length;
  const angkaTerbesar = angka.reduce((terbesar, n) =>
    n > terbesar ? n : terbesar, angka[0]);

  document.getElementById("hasil2").textContent =
    "Total angka: " + total +
    "\nRata-rata: " + rataRata +
    "\nAngka terbesar: " + angkaTerbesar;
}

// 3. some dan every
function demoSomeEvery() {
  const adaAngkaGenap = angka.some(n => n % 2 === 0);
  const semuaPositif = angka.every(n => n > 0);

  document.getElementById("hasil3").textContent =
    "Apakah ada angka genap? " + adaAngkaGenap +
    "\nApakah semua angka positif? " + semuaPositif;
}

// 4. method chaining
function demoChaining() {
  const namaPenggunaAktif = pengguna
    .filter(p => p.aktif)
    .filter(p => p.umur > 25)
    .map(p => p.nama);

  const totalUmurAktif = pengguna
    .filter(p => p.aktif)
    .reduce((total, p) => total + p.umur, 0);

  document.getElementById("hasil4").textContent =
    "Nama pengguna aktif berumur di atas 25: " +
    JSON.stringify(namaPenggunaAktif) +
    "\nTotal umur pengguna aktif: " + totalUmurAktif;
}

// 5. Advanced Arrays
function demoAdvancedArrays() {
  const dariString = Array.from("belajar");
  const arrayBaru = Array.of(10, 20, 30);
  const arrayBersarang = [1, [2, 3], [[4, 5]]];
  const arrayRata = arrayBersarang.flat(2);
  const hasilFlatMap = [1, 2, 3].flatMap(n => [n, n * 2]);
  const adaTiga = angka.includes(3);

  document.getElementById("hasil5").textContent =
    "Array.from: " + JSON.stringify(dariString) +
    "\nArray.of: " + JSON.stringify(arrayBaru) +
    "\nflat(2): " + JSON.stringify(arrayRata) +
    "\nflatMap: " + JSON.stringify(hasilFlatMap) +
    "\nApakah angka 3 tersedia? " + adaTiga;
}
