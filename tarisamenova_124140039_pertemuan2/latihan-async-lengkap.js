
"use strict";

// Fungsi bantuan untuk simulasi operasi asynchronous
function simulasiData(data, waktu = 800, gagal = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (gagal) {
        reject(new Error("Operasi gagal diproses."));
      } else {
        resolve(data);
      }
    }, waktu);
  });
}

// 1. Promise dasar, catch, dan finally
function demoPromiseDasar() {
  const output = document.getElementById("hasil1");
  output.textContent = "Sedang memproses...";

  simulasiData("Operasi berhasil!", 800)
    .then(hasil => {
      output.textContent = hasil;
    })
    .catch(error => {
      output.textContent = "Error: " + error.message;
    })
    .finally(() => {
      output.textContent += "\nProses selesai.";
    });
}

// 2. Promise chaining
function demoChaining() {
  const output = document.getElementById("hasil2");
  output.textContent = "Mengambil data pengguna...";

  simulasiData({ id: 1, nama: "Andi" })
    .then(user => {
      output.textContent = "Pengguna: " + user.nama;
      return simulasiData([
        { id: 101, judul: "Belajar JavaScript" },
        { id: 102, judul: "Belajar Promise" }
      ]);
    })
    .then(posts => {
      output.textContent +=
        "\nDaftar post: " +
        posts.map(post => post.judul).join(", ");
    })
    .catch(error => {
      output.textContent = "Error: " + error.message;
    });
}

// 3. Promise.all
function demoPromiseAll() {
  const output = document.getElementById("hasil3");
  output.textContent = "Menjalankan tiga proses...";

  Promise.all([
    simulasiData("Data pengguna", 700),
    simulasiData("Data artikel", 900),
    simulasiData("Data komentar", 500)
  ])
    .then(hasil => {
      output.textContent =
        "Semua proses berhasil:\n" + hasil.join("\n");
    })
    .catch(error => {
      output.textContent = "Ada proses gagal: " + error.message;
    });
}

// 4. Promise.race
function demoPromiseRace() {
  const output = document.getElementById("hasil4");
  output.textContent = "Menunggu proses tercepat...";

  Promise.race([
    simulasiData("Proses A selesai", 1000),
    simulasiData("Proses B selesai", 400),
    simulasiData("Proses C selesai", 700)
  ])
    .then(hasil => {
      output.textContent = "Hasil pertama: " + hasil;
    })
    .catch(error => {
      output.textContent = "Error: " + error.message;
    });
}

// 5. Promise.allSettled
function demoAllSettled() {
  const output = document.getElementById("hasil5");
  output.textContent = "Memeriksa seluruh proses...";

  Promise.allSettled([
    simulasiData("Data A berhasil", 400),
    simulasiData(null, 600, true),
    simulasiData("Data C berhasil", 800)
  ]).then(hasil => {
    output.textContent = hasil.map((item, index) => {
      if (item.status === "fulfilled") {
        return `${index + 1}. Sukses: ${item.value}`;
      }

      return `${index + 1}. Gagal: ${item.reason.message}`;
    }).join("\n");
  });
}

// 6. Promise.any
function demoPromiseAny() {
  const output = document.getElementById("hasil6");
  output.textContent = "Mencari proses pertama yang berhasil...";

  Promise.any([
    simulasiData("Proses A berhasil", 300, true),
    simulasiData("Proses B berhasil", 700),
    simulasiData("Proses C berhasil", 500, true)
  ])
    .then(hasil => {
      output.textContent = "Keberhasilan pertama: " + hasil;
    })
    .catch(() => {
      output.textContent = "Semua proses gagal.";
    });
}

// 7. Async/await dan try/catch
async function demoAsyncAwait() {
  const output = document.getElementById("hasil7");
  output.textContent = "Memuat data...";

  try {
    const user = await simulasiData({
      id: 42,
      nama: "Tarisa"
    });

    output.textContent =
      `Nama pengguna: ${user.nama}\nID pengguna: ${user.id}`;

    const dataGagal = await simulasiData(null, 400, true);
    output.textContent += "\n" + dataGagal;
  } catch (error) {
    output.textContent +=
      "\nError berhasil ditangani: " + error.message;
  }
}

// 8. Operasi paralel menggunakan Promise.all
async function demoParalel() {
  const output = document.getElementById("hasil8");
  output.textContent = "Menjalankan proses secara paralel...";

  const mulai = Date.now();

  try {
    const [pengguna, artikel, komentar] = await Promise.all([
      simulasiData("Data pengguna siap", 1000),
      simulasiData("Data artikel siap", 1000),
      simulasiData("Data komentar siap", 1000)
    ]);

    const durasi = Date.now() - mulai;

    output.textContent =
      `${pengguna}\n${artikel}\n${komentar}\n` +
      `Waktu proses: ${durasi} ms`;
  } catch (error) {
    output.textContent = "Error: " + error.message;
  }
}

// 9. Menggabungkan data dari beberapa operasi
async function demoGabungData() {
  const output = document.getElementById("hasil9");
  output.textContent = "Menggabungkan data...";

  try {
    const [user, posts] = await Promise.all([
      simulasiData({ id: 7, nama: "Citra" }, 600),
      simulasiData([
        { judul: "HTML Dasar" },
        { judul: "JavaScript ES6+" }
      ], 800)
    ]);

    const hasil = {
      pengguna: user.nama,
      jumlahPost: posts.length,
      judulPost: posts.map(post => post.judul)
    };

    output.textContent = JSON.stringify(hasil, null, 2);
  } catch (error) {
    output.textContent = "Error: " + error.message;
  }
}
