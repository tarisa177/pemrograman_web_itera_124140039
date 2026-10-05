// ========================================
// 1. VARIABLES, CONST, DAN LET
// ========================================

function tampilkanVariabel() {
    let nama = "Tarisa Menova";
    let umur = 18;
    const nim = "124140039";

    document.getElementById("hasilVariabel").innerHTML = `
        Nama: ${nama}<br>
        Umur: ${umur}<br>
        NIM: ${nim}
    `;
}


// ========================================
// 2. IF / ELSE
// ========================================

function cekNilai() {
    const nilai = Number(document.getElementById("nilai").value);
    const hasil = document.getElementById("hasilNilai");

    if (document.getElementById("nilai").value === "") {
        hasil.innerHTML = "Silakan masukkan nilai terlebih dahulu.";
        return;
    }

    if (nilai >= 80) {
        hasil.innerHTML = "Nilai kamu: A";
    } else if (nilai >= 70) {
        hasil.innerHTML = "Nilai kamu: B";
    } else if (nilai >= 60) {
        hasil.innerHTML = "Nilai kamu: C";
    } else if (nilai >= 50) {
        hasil.innerHTML = "Nilai kamu: D";
    } else {
        hasil.innerHTML = "Nilai kamu: E";
    }
}


// ========================================
// 3. TERNARY OPERATOR
// ========================================

function cekUmur() {
    const umurInput = document.getElementById("umur");
    const hasil = document.getElementById("hasilUmur");

    if (umurInput.value === "") {
        hasil.innerHTML = "Silakan masukkan umur terlebih dahulu.";
        return;
    }

    const umur = Number(umurInput.value);

    const status = umur >= 17
        ? "Sudah memenuhi batas usia 17 tahun."
        : "Belum mencapai usia 17 tahun.";

    hasil.innerHTML = status;
}


// ========================================
// 4. SWITCH CASE
// ========================================

function cekHari() {
    const hari = document.getElementById("hari").value;
    const hasil = document.getElementById("hasilHari");

    let namaHari;

    switch (hari) {
        case "1":
            namaHari = "Senin";
            break;

        case "2":
            namaHari = "Selasa";
            break;

        case "3":
            namaHari = "Rabu";
            break;

        case "4":
            namaHari = "Kamis";
            break;

        case "5":
            namaHari = "Jumat";
            break;

        case "6":
            namaHari = "Sabtu";
            break;

        case "7":
            namaHari = "Minggu";
            break;

        default:
            namaHari = "Silakan pilih nomor hari.";
    }

    hasil.innerHTML = namaHari;
}


// ========================================
// 5. PERULANGAN FOR
// ========================================

function jalankanLoop() {
    let hasil = "";

    for (let i = 1; i <= 10; i++) {
        hasil += `Perulangan ke-${i}<br>`;
    }

    document.getElementById("hasilLoop").innerHTML = hasil;
}


// ========================================
// 6. FUNCTION
// ========================================

function tambah(a, b) {
    return a + b;
}

function hitungPenjumlahan() {
    const angka1 = Number(document.getElementById("angka1").value);
    const angka2 = Number(document.getElementById("angka2").value);

    const input1 = document.getElementById("angka1").value;
    const input2 = document.getElementById("angka2").value;

    if (input1 === "" || input2 === "") {
        document.getElementById("hasilFunction").innerHTML =
            "Kedua angka harus diisi.";
        return;
    }

    const hasil = tambah(angka1, angka2);

    document.getElementById("hasilFunction").innerHTML =
        `${angka1} + ${angka2} = <strong>${hasil}</strong>`;
}


// ========================================
// 7. FAKTORIAL
// ========================================

function hitungFaktorial() {
    const input = document.getElementById("angkaFaktorial");
    const hasilElement = document.getElementById("hasilFaktorial");

    if (input.value === "") {
        hasilElement.innerHTML = "Masukkan angka terlebih dahulu.";
        return;
    }

    const angka = Number(input.value);

    if (angka < 0 || !Number.isInteger(angka)) {
        hasilElement.innerHTML =
            "Masukkan bilangan bulat yang tidak negatif.";
        return;
    }

    let hasil = 1;

    for (let i = 1; i <= angka; i++) {
        hasil *= i;
    }

    hasilElement.innerHTML =
        `${angka}! = <strong>${hasil}</strong>`;
}


// ========================================
// 8. BILANGAN PRIMA
// ========================================

function cekPrima() {
    const input = document.getElementById("angkaPrima");
    const hasilElement = document.getElementById("hasilPrima");

    if (input.value === "") {
        hasilElement.innerHTML = "Masukkan angka terlebih dahulu.";
        return;
    }

    const angka = Number(input.value);

    if (!Number.isInteger(angka) || angka < 2) {
        hasilElement.innerHTML =
            `${angka} bukan bilangan prima.`;
        return;
    }

    let prima = true;

    for (let i = 2; i < angka; i++) {
        if (angka % i === 0) {
            prima = false;
            break;
        }
    }

    if (prima) {
        hasilElement.innerHTML =
            `<strong>${angka}</strong> adalah bilangan prima.`;
    } else {
        hasilElement.innerHTML =
            `<strong>${angka}</strong> bukan bilangan prima.`;
    }
}


// ========================================
// 9. BMI
// ========================================

function hitungBMI() {
    const berat = Number(document.getElementById("berat").value);
    const tinggiCm = Number(document.getElementById("tinggi").value);

    const hasilElement = document.getElementById("hasilBMI");

    if (
        document.getElementById("berat").value === "" ||
        document.getElementById("tinggi").value === ""
    ) {
        hasilElement.innerHTML =
            "Berat dan tinggi harus diisi.";
        return;
    }

    if (berat <= 0 || tinggiCm <= 0) {
        hasilElement.innerHTML =
            "Berat dan tinggi harus lebih dari 0.";
        return;
    }

    const tinggiMeter = tinggiCm / 100;
    const bmi = berat / (tinggiMeter * tinggiMeter);

    let kategori;

    if (bmi < 18.5) {
        kategori = "Di bawah rentang referensi";
    } else if (bmi < 25) {
        kategori = "Rentang referensi";
    } else if (bmi < 30) {
        kategori = "Di atas rentang referensi";
    } else {
        kategori = "Jauh di atas rentang referensi";
    }

    hasilElement.innerHTML = `
        Nilai BMI: <strong>${bmi.toFixed(2)}</strong><br>
        Kategori: ${kategori}
    `;
}


// ========================================
// 10. FIZZBUZZ
// ========================================

function jalankanFizzBuzz() {
    let hasil = "";

    for (let i = 1; i <= 30; i++) {

        if (i % 15 === 0) {
            hasil += "FizzBuzz<br>";
        } else if (i % 3 === 0) {
            hasil += "Fizz<br>";
        } else if (i % 5 === 0) {
            hasil += "Buzz<br>";
        } else {
            hasil += `${i}<br>`;
        }
    }

    document.getElementById("hasilFizzBuzz").innerHTML = hasil;
}


// ========================================
// 11. ARRAY
// ========================================

function tampilkanArray() {
    const mahasiswa = [
        "Tarisa",
        "Alya",
        "Nadia",
        "Raka",
        "Dimas"
    ];

    document.getElementById("hasilArray").innerHTML =
        mahasiswa.join(", ");
}


// ========================================
// 12. OBJECT
// ========================================

function tampilkanObject() {
    const mahasiswa = {
        nama: "Tarisa Menova",
        nim: "124140039",
        kelas: "PAW RA"
    };

    document.getElementById("hasilObject").innerHTML = `
        Nama: ${mahasiswa.nama}<br>
        NIM: ${mahasiswa.nim}<br>
        Kelas: ${mahasiswa.kelas}
    `;
}


// ========================================
// 13. MAP, FILTER, REDUCE
// ========================================

function jalankanArrayMethod() {

    const angka = [1, 2, 3, 4, 5];

    // MAP
    const hasilMap = angka.map(function (nilai) {
        return nilai * 2;
    });

    // FILTER
    const hasilFilter = angka.filter(function (nilai) {
        return nilai % 2 === 0;
    });

    // REDUCE
    const hasilReduce = angka.reduce(function (total, nilai) {
        return total + nilai;
    }, 0);

    document.getElementById("hasilArrayMethod").innerHTML = `
        Array awal: ${angka.join(", ")}<br>
        Map x2: ${hasilMap.join(", ")}<br>
        Filter angka genap: ${hasilFilter.join(", ")}<br>
        Reduce / total: ${hasilReduce}
    `;
}


// ========================================
// 14. FORM MAHASISWA
// ========================================

document
    .getElementById("formMahasiswa")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const nama = document
            .getElementById("namaMahasiswa")
            .value
            .trim();

        const nim = document
            .getElementById("nimMahasiswa")
            .value
            .trim();

        const hasil = document.getElementById("hasilMahasiswa");

        if (nama === "") {
            hasil.innerHTML = "Nama harus diisi.";
            return;
        }

        if (nim === "") {
            hasil.innerHTML = "NIM harus diisi.";
            return;
        }

        hasil.innerHTML = `
            Data berhasil disimpan.<br>
            Nama: <strong>${nama}</strong><br>
            NIM: <strong>${nim}</strong>
        `;
    });


// ========================================
// 15. LOCAL STORAGE
// ========================================

function simpanLocalStorage() {

    const dataMahasiswa = {
        nama: "Tarisa Menova",
        nim: "124140039",
        kelas: "PAW RA"
    };

    localStorage.setItem(
        "dataMahasiswa",
        JSON.stringify(dataMahasiswa)
    );

    document.getElementById("hasilLocalStorage").innerHTML =
        "Data berhasil disimpan ke LocalStorage.";
}


function ambilLocalStorage() {

    const data = localStorage.getItem("dataMahasiswa");

    if (data === null) {
        document.getElementById("hasilLocalStorage").innerHTML =
            "Belum ada data yang tersimpan.";
        return;
    }

    const mahasiswa = JSON.parse(data);

    document.getElementById("hasilLocalStorage").innerHTML = `
        Nama: ${mahasiswa.nama}<br>
        NIM: ${mahasiswa.nim}<br>
        Kelas: ${mahasiswa.kelas}
    `;
}


function hapusLocalStorage() {

    localStorage.removeItem("dataMahasiswa");

    document.getElementById("hasilLocalStorage").innerHTML =
        "Data LocalStorage berhasil dihapus.";
}


// ========================================
// 16. TODO LIST
// ========================================

let todos = [];


function tambahTodo() {

    const input = document.getElementById("todoInput");
    const teks = input.value.trim();

    if (teks === "") {
        alert("Tuliskan kegiatan terlebih dahulu.");
        return;
    }

    todos.push(teks);

    input.value = "";

    tampilkanTodo();
}


function tampilkanTodo() {

    const list = document.getElementById("todoList");

    list.innerHTML = "";

    todos.forEach(function (todo, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${todo}</span>
            <button onclick="hapusTodo(${index})">
                Hapus
            </button>
        `;

        list.appendChild(li);
    });
}


function hapusTodo(index) {

    todos.splice(index, 1);

    tampilkanTodo();
}


// ========================================
// 17. SEARCH DAN FILTER
// ========================================

const daftarNama = [
    "Tarisa",
    "Alya",
    "Nadia",
    "Raka",
    "Dimas",
    "Sinta",
    "Budi"
];


function cariNama() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const hasil = daftarNama.filter(function (nama) {
        return nama.toLowerCase().includes(keyword);
    });

    const list = document.getElementById("hasilSearch");

    list.innerHTML = "";

    hasil.forEach(function (nama) {

        const li = document.createElement("li");

        li.textContent = nama;

        list.appendChild(li);
    });
}


// Tampilkan semua nama ketika halaman dibuka
cariNama();


// ========================================
// 18. DARK MODE
// ========================================

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");
}


// ========================================
// 19. FETCH API
// ========================================

async function ambilDataAPI() {

    const hasil = document.getElementById("hasilAPI");

    hasil.innerHTML = "Sedang mengambil data...";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Gagal mengambil data.");
        }

        const data = await response.json();

        let output = "<strong>Data pengguna:</strong><br><br>";

        data.slice(0, 5).forEach(function (user) {

            output += `
                Nama: ${user.name}<br>
                Email: ${user.email}<br>
                Kota: ${user.address.city}
                <hr>
            `;
        });

        hasil.innerHTML = output;

    } catch (error) {

        hasil.innerHTML =
            `Terjadi kesalahan: ${error.message}`;
    }
}