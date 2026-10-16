
"use strict";

// 1. Default Parameters
function buatSalam(nama = "Mahasiswa", mataKuliah = "Pemrograman Web") {
  return `Halo, ${nama}! Selamat belajar ${mataKuliah}.`;
}

function demoDefaultParameters() {
  const hasil = [
    buatSalam("Tarisa", "JavaScript"),
    buatSalam()
  ];

  document.getElementById("hasil1").textContent = hasil.join("\n");
}

// 2. Class, Constructor, dan Method
class Mahasiswa {
  constructor(nama, nim, jurusan = "Informatika") {
    this.nama = nama;
    this.nim = nim;
    this.jurusan = jurusan;
  }

  perkenalan() {
    return `Nama: ${this.nama}\nNIM: ${this.nim}\nJurusan: ${this.jurusan}`;
  }
}

function demoClass() {
  const mahasiswa1 = new Mahasiswa(
    "Tarisa",
    "124140039"
  );

  document.getElementById("hasil2").textContent =
    mahasiswa1.perkenalan();
}

// 3. Inheritance (Pewarisan)
class Pengguna {
  constructor(nama) {
    this.nama = nama;
  }

  sapa() {
    return `Halo, saya ${this.nama}.`;
  }
}

class MahasiswaAktif extends Pengguna {
  constructor(nama, programStudi) {
    super(nama);
    this.programStudi = programStudi;
  }

  tampilkanInfo() {
    return `${this.sapa()}\nProgram studi: ${this.programStudi}`;
  }
}

function demoInheritance() {
  const mahasiswa = new MahasiswaAktif(
    "Tarisa",
    "Informatika"
  );

  document.getElementById("hasil3").textContent =
    mahasiswa.tampilkanInfo();
}

// 4. Enhanced Object Literals
function demoObjectLiterals() {
  const nama = "Tarisa";
  const nilai = 90;

  const mahasiswa = {
    nama,
    nilai,

    tampilkanInfo() {
      return `${this.nama memperoleh nilai ${this.nilai}.`;
    },

    ["status"]: nilai >= 75 ? "Lulus" : "Belum lulus"
  };

  document.getElementById("hasil4").textContent =
    "Nama: " + mahasiswa.nama +
    "\nNilai: " + mahasiswa.nilai +
    "\nStatus: " + mahasiswa.status +
    "\nInfo: " + mahasiswa.tampilkanInfo();
}
