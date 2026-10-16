
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
