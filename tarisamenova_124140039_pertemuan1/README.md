# Aplikasi Kasir & Keranjang Belanja Sederhana (Mini POS)

## Identitas Mahasiswa

- Nama: Tarisa Menova
- NIM: 124140039
- Kelas: PAW RA

## Deskripsi Aplikasi

Aplikasi Mini POS (Point of Sale) merupakan aplikasi kasir dan keranjang belanja sederhana berbasis web yang dibuat menggunakan HTML, CSS, dan JavaScript.

Aplikasi ini dibuat sebagai tugas praktikum Pemrograman Web ITERA dengan studi kasus kasir sederhana pada kantin atau toko.

Pengguna dapat memasukkan nama produk, harga satuan, dan jumlah barang. Produk yang ditambahkan akan masuk ke dalam keranjang belanja dan sistem akan menghitung subtotal serta total belanja secara otomatis.

Aplikasi juga menyediakan fitur diskon otomatis 10% apabila total belanja mencapai Rp50.000, pembayaran, perhitungan kembalian, penyimpanan data menggunakan localStorage, dan catatan transaksi.

## Tujuan

Tujuan pembuatan aplikasi ini adalah:

1. Menerapkan HTML untuk membuat struktur halaman dan form.
2. Menerapkan CSS untuk membuat tampilan aplikasi.
3. Menerapkan JavaScript untuk validasi dan interaksi aplikasi.
4. Menerapkan perhitungan subtotal dan total belanja.
5. Menerapkan sistem diskon otomatis.
6. Menerapkan perhitungan pembayaran dan kembalian.
7. Menerapkan array dan object.
8. Menerapkan manipulasi DOM dan event handler.
9. Menerapkan localStorage untuk menyimpan data.
10. Menerapkan JSON.stringify() dan JSON.parse().

## Studi Kasus

Studi kasus yang digunakan adalah sistem kasir sederhana pada kantin atau toko.

Kasir dapat memasukkan data barang berupa:

- Nama barang
- Harga satuan
- Jumlah barang

Setiap barang yang ditambahkan akan masuk ke dalam keranjang. Sistem kemudian menghitung subtotal setiap barang dan total seluruh belanja.

Jika total belanja mencapai atau lebih dari Rp50.000, sistem memberikan diskon sebesar 10%.

Setelah pengguna memasukkan uang pembayaran, sistem akan menghitung kembalian secara otomatis.

Transaksi yang telah selesai dapat disimpan pada bagian Catatan Transaksi.

## Fitur Aplikasi

### 1. Form Tambah Produk

Form digunakan untuk memasukkan produk ke dalam keranjang.

Validasi yang diterapkan:

- Nama produk wajib diisi.
- Nama produk minimal 3 karakter.
- Harga harus berupa angka.
- Harga minimal Rp500.
- Jumlah harus berupa bilangan bulat.
- Jumlah minimal 1.

Jika data tidak valid, pesan kesalahan akan ditampilkan di bawah input yang bermasalah.

Jika data valid, produk akan ditambahkan ke dalam keranjang dan form akan dikosongkan kembali.

### 2. Keranjang Belanja

Keranjang menampilkan daftar produk yang telah ditambahkan.

Tabel keranjang memiliki kolom:

- No
- Nama
- Harga Satuan
- Qty
- Subtotal
- Aksi

Pengguna dapat menghapus produk dari keranjang menggunakan tombol Hapus.

### 3. Perhitungan Subtotal

Subtotal setiap produk dihitung menggunakan rumus:

Subtotal = Harga Satuan × Jumlah

### 4. Perhitungan Total Belanja

Total belanja merupakan jumlah seluruh subtotal produk yang ada di dalam keranjang.

Total akan diperbarui secara otomatis ketika produk ditambahkan atau dihapus.

### 5. Diskon Otomatis

Aplikasi memberikan diskon sebesar 10% apabila total belanja mencapai atau lebih dari Rp50.000.

Rumus:

Diskon = Total Belanja × 10%

Total Akhir = Total Belanja - Diskon

Jika total belanja kurang dari Rp50.000, maka diskon adalah Rp0.

### 6. Pembayaran dan Kembalian

Pengguna dapat memasukkan jumlah uang yang dibayarkan.

Jika uang pembayaran kurang dari total akhir, aplikasi akan menampilkan pesan bahwa pembayaran tidak mencukupi.

Jika pembayaran mencukupi, aplikasi akan menghitung kembalian.

Rumus:

Kembalian = Uang Bayar - Total Akhir

### 7. Catatan Transaksi

Aplikasi menyediakan bagian Catatan Transaksi untuk menyimpan transaksi yang telah selesai.

Informasi yang dicatat meliputi:

- Nomor transaksi
- Tanggal transaksi
- Total belanja
- Diskon
- Total akhir
- Uang pembayaran
- Kembalian

Catatan transaksi dapat dihapus apabila sudah tidak diperlukan.

### 8. localStorage

Aplikasi menggunakan localStorage untuk menyimpan:

- Data keranjang belanja
- Catatan transaksi

Data disimpan menggunakan JSON.stringify() dan diambil kembali menggunakan JSON.parse().

Dengan penggunaan localStorage, data tetap tersedia ketika halaman direfresh.

### 9. Transaksi Baru / Reset

Tombol Transaksi Baru digunakan untuk mengosongkan keranjang setelah transaksi selesai.

Data keranjang yang tersimpan pada localStorage juga akan dibersihkan sehingga pengguna dapat memulai transaksi berikutnya.

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript
- localStorage
- JSON

## Struktur Folder

    tarisa_124140039_pertemuan1/
    │
    ├── index.html
    ├── style.css
    ├── script.js
    ├── README.md
    │
    ├── screenshots/
    │   ├── tampilan-utama.png
    │   ├── validasi-error.png
    │   └── catatan-transaksi.png
    │
    └── modul/
        ├── latihan.html
        ├── latihan.css
        └── latihan.js

## Penjelasan File

### index.html

Berisi struktur utama aplikasi Mini POS seperti form tambah produk, tabel keranjang, pembayaran, dan catatan transaksi.

### style.css

Berisi kode CSS untuk mengatur tampilan aplikasi agar rapi dan responsif.

### script.js

Berisi logika JavaScript untuk:

- Validasi input
- Menambahkan produk
- Menghapus produk
- Menghitung subtotal
- Menghitung total belanja
- Menghitung diskon
- Menghitung pembayaran
- Menghitung kembalian
- Mengelola localStorage
- Mengelola catatan transaksi
- Memanipulasi DOM

### modul/

Berisi file latihan praktikum yang digunakan untuk mempelajari dasar-dasar JavaScript dan pengembangan web.

## Cara Menjalankan Aplikasi

1. Buka folder project menggunakan Visual Studio Code.
2. Pastikan file index.html, style.css, dan script.js berada di folder utama.
3. Pastikan ekstensi Live Server sudah terpasang.
4. Klik kanan pada file index.html.
5. Pilih Open with Live Server.
6. Aplikasi akan terbuka pada browser.

## Alur Penggunaan

1. Masukkan nama produk.
2. Masukkan harga satuan.
3. Masukkan jumlah barang.
4. Klik Tambah ke Keranjang.
5. Produk akan masuk ke tabel keranjang.
6. Sistem menghitung subtotal dan total belanja secara otomatis.
7. Jika total belanja mencapai Rp50.000, sistem memberikan diskon 10%.
8. Masukkan jumlah uang pembayaran.
9. Sistem menghitung kembalian.
10. Setelah transaksi selesai, transaksi dicatat pada bagian Catatan Transaksi.
11. Gunakan Transaksi Baru untuk membersihkan keranjang dan memulai transaksi berikutnya.

## Contoh Perhitungan

Contoh transaksi:

Produk A
- Harga: Rp20.000
- Jumlah: 2
- Subtotal: Rp40.000

Produk B
- Harga: Rp15.000
- Jumlah: 1
- Subtotal: Rp15.000

Hasil:

- Total Belanja: Rp55.000
- Diskon 10%: Rp5.500
- Total Akhir: Rp49.500
- Uang Bayar: Rp50.000
- Kembalian: Rp500

Karena total belanja mencapai Rp50.000, transaksi mendapatkan diskon sebesar 10%.

## Dokumentasi Screenshot

### 1. Tampilan Utama

Screenshot tampilan utama aplikasi Mini POS yang menampilkan form tambah produk dan keranjang belanja.

![Tampilan Utama](screenshots/awal.png)

### 2. Validasi Error

Screenshot yang menunjukkan pesan kesalahan ketika input tidak sesuai dengan ketentuan validasi.

![Validasi Error](screenshots/eror.png)

### 3. Perhitungan dan Catatan Transaksi

Screenshot yang menunjukkan hasil perhitungan total belanja, diskon, total akhir, pembayaran, kembalian, dan catatan transaksi.

![Catatan Transaksi](screenshots/catatan transasksi.png)

## Penjelasan Teknis

### Validasi JavaScript

JavaScript digunakan untuk memeriksa data sebelum produk ditambahkan ke keranjang. Validasi dilakukan menggunakan percabangan if untuk memastikan data memenuhi ketentuan yang telah ditentukan.

### Array dan Object

Data produk disimpan dalam bentuk object. Beberapa object produk kemudian disimpan dalam array cart.

### Manipulasi DOM

JavaScript digunakan untuk memanipulasi DOM agar tampilan aplikasi dapat berubah sesuai interaksi pengguna.

Contohnya adalah menambahkan produk ke tabel keranjang, menghapus produk, memperbarui total belanja, dan menampilkan pesan validasi.

### Perhitungan

Perhitungan dilakukan menggunakan operator aritmatika JavaScript untuk mendapatkan subtotal, total belanja, diskon, total akhir, dan kembalian.

### localStorage

Data keranjang dan catatan transaksi disimpan menggunakan localStorage.

JSON.stringify() digunakan untuk mengubah data menjadi string JSON sebelum disimpan.

JSON.parse() digunakan untuk mengubah data JSON yang tersimpan menjadi array atau object kembali.

Dengan cara ini, data dapat dimuat kembali ketika halaman direfresh.

## Checklist Fitur

- [x] Form tambah produk
- [x] Validasi nama produk
- [x] Validasi harga
- [x] Validasi jumlah
- [x] Pesan validasi error
- [x] Keranjang belanja
- [x] Perhitungan subtotal
- [x] Perhitungan total belanja
- [x] Diskon otomatis 10%
- [x] Input pembayaran
- [x] Validasi pembayaran
- [x] Perhitungan kembalian
- [x] Hapus produk
- [x] localStorage
- [x] JSON.stringify()
- [x] JSON.parse()
- [x] Catatan transaksi
- [x] Hapus catatan transaksi
- [x] Transaksi baru / reset
- [x] Tampilan responsif
- [x] Dokumentasi screenshot

## Kesimpulan

Aplikasi Mini POS merupakan aplikasi kasir sederhana berbasis web yang dibuat menggunakan HTML, CSS, dan JavaScript.

Aplikasi ini menerapkan form validation, manipulasi DOM, array dan object, perhitungan transaksi, sistem diskon, pembayaran dan kembalian, localStorage, serta catatan transaksi.

Aplikasi ini dibuat sebagai implementasi materi praktikum Pemrograman Web ITERA.