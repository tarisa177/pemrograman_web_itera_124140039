
"use strict";

// 1. Let dan Const
function demoVariables() {
  let tugasSelesai = 2;
  tugasSelesai = tugasSelesai + 1;

  const nama = "Tarisa Menova";
  const mahasiswa = {
    nama: nama,
    nim: "124140039"
  };

  // Properti objek const masih dapat diubah
  mahasiswa.nama = "Tarisa Menova";

  return `Nama: ${mahasiswa.nama}
NIM: ${mahasiswa.nim}
Jumlah tugas selesai: ${tugasSelesai}
PI: ${Math.PI}`;
}

// 2. Arrow Functions
function demoArrowFunctions() {
  const jumlah = (a, b) => a + b;
  const kuadrat = angka => angka * angka;
  const sapa = () => "Halo, selamat belajar JavaScript!";

  return `Hasil 5 + 3: ${jumlah(5, 3)}
Kuadrat 4: ${kuadrat(4)}
Sapaan: ${sapa()}`;
}

// 3. Template Literals
function demoTemplateLiterals() {
  const name = "Tarisa";
  const age = 20;

  // Cara lama: concatenation
  const oldWay =
    "Nama saya " + name + " dan umur saya " + age + " tahun.";

  // Cara baru: template literals
  const newWay =
    `Nama saya ${name} dan umur saya ${age} tahun.`;

  // String multi-baris
  const multiLine = `
Nama: ${name}
Umur: ${age}
Mata kuliah: Pemrograman Web`;

  // Ekspresi JavaScript di dalam string
  const expression =
    `Dua tahun lagi umur saya ${age + 2} tahun.`;

  return `Cara lama:
${oldWay}

Template literals:
${newWay}

String multi-baris:
${multiLine}

Ekspresi:
${expression}`;
}

// 4. Destructuring dan Spread Operator
function demoOperators() {
  const mahasiswa = {
    nama: "Tarisa Menova",
    nim: "124140039"
  };

  // Destructuring objek
  const { nama, nim } = mahasiswa;

  // Spread operator untuk menyalin dan menambah data array
  const tugasAwal = ["Membuat dashboard"];
  const semuaTugas = [...tugasAwal, "Latihan JavaScript ES6+"];

  return `Nama: ${nama}
NIM: ${nim}
Tugas awal: ${tugasAwal.join(", ")}
Semua tugas: ${semuaTugas.join(", ")}`;
}

// Hubungkan tombol dengan masing-masing demo
document.getElementById("variablesBtn").addEventListener("click", () => {
  document.getElementById("variablesOutput").textContent =
    demoVariables();
});

document.getElementById("arrowBtn").addEventListener("click", () => {
  document.getElementById("arrowOutput").textContent =
    demoArrowFunctions();
});

document.getElementById("templateBtn").addEventListener("click", () => {
  document.getElementById("templateOutput").textContent =
    demoTemplateLiterals();
});

document.getElementById("operatorsBtn").addEventListener("click", () => {
  document.getElementById("operatorsOutput").textContent =
    demoOperators();
});

/* ==========================================
   LATIHAN LANJUTAN: DESTRUCTURING, SPREAD,
   DAN REST PARAMETERS
========================================== */

// Latihan 1: Nested destructuring minimal 3 level
function latihanNestedDestructuring() {
  const mahasiswa = {
    nama: "Tarisa Menova",
    akademik: {
      program: {
        mataKuliah: "Pemrograman Web",
        pertemuan: 2
      }
    }
  };

  const {
    nama,
    akademik: {
      program: { mataKuliah, pertemuan }
    }
  } = mahasiswa;

  return `Nama: ${nama}
Mata kuliah: ${mataKuliah}
Pertemuan: ${pertemuan}`;
}

// Latihan 2: Rest parameter untuk min, max, dan rata-rata
function latihanStatistik(...angka) {
  if (angka.length === 0) {
    return "Masukkan minimal satu angka.";
  }

  const min = Math.min(...angka);
  const max = Math.max(...angka);
  const average =
    angka.reduce((total, nilai) => total + nilai, 0) / angka.length;

  return `Angka: ${angka.join(", ")}
Minimum: ${min}
Maksimum: ${max}
Rata-rata: ${average.toFixed(2)}`;
}

// Latihan 3: Merge tiga object dengan spread
function latihanMergeObject() {
  const identitas = {
    nama: "Tarisa Menova",
    nim: "124140039"
  };

  const kuliah = {
    mataKuliah: "Pemrograman Web",
    pertemuan: 2
  };

  const status = {
    status: "Belum selesai",
    nilai: 0
  };

  const hasil = {
    ...identitas,
    ...kuliah,
    ...status,
    status: "Sedang dikerjakan",
    nilai: 100
  };

  return JSON.stringify(hasil, null, 2);
}

// Latihan 4: Destructuring dalam for...of
function latihanForOfDestructuring() {
  const daftarTugas = [
    { nama: "Membuat dashboard", status: "Selesai" },
    { nama: "Latihan ES6+", status: "Dikerjakan" },
    { nama: "Membuat README", status: "Dikerjakan" }
  ];

  let hasil = "";

  for (const { nama, status } of daftarTugas) {
    hasil += `${nama} — ${status}\n`;
  }

  return hasil;
}

// Tampilkan hasil latihan di Console browser
console.log("Latihan 1: Nested Destructuring");
console.log(latihanNestedDestructuring());

console.log("Latihan 2: Statistik");
console.log(latihanStatistik(70, 85, 90, 100));

console.log("Latihan 3: Merge Object");
console.log(latihanMergeObject());

console.log("Latihan 4: Destructuring dalam for...of");
console.log(latihanForOfDestructuring());
