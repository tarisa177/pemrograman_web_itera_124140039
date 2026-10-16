# StudySpace — Student Dashboard

StudySpace adalah dashboard produktivitas sederhana untuk membantu mahasiswa mencatat dan mengelola tugas kuliah, memantau progres penyelesaian, serta melihat informasi cuaca kampus dan kutipan motivasi.

## Fitur aplikasi
- Menambah tugas dengan nama, mata kuliah, deadline, dan prioritas.
- Mengedit dan menghapus tugas.
- Menandai tugas selesai/belum selesai.
- Filter daftar: semua, berjalan, selesai.
- Statistik total tugas, tugas tertunda, tugas selesai, dan progres.
- Menyimpan data tugas di `localStorage` sehingga tetap tersedia saat halaman dibuka kembali pada browser yang sama.
- Mengambil cuaca Lampung Selatan melalui Open-Meteo API.
- Mengambil kutipan motivasi melalui DummyJSON Quotes API.
- Tampilan responsif untuk laptop dan ponsel.

## Cara menjalankan
1. Ekstrak ZIP proyek.
2. Buka folder `student-dashboard` di Visual Studio Code.
3. Jika tersedia, pasang ekstensi **Live Server** dari Extensions (`Ctrl+Shift+X`), lalu klik kanan `index.html` → **Open with Live Server**.
4. Alternatif: buka `index.html` langsung di browser. Untuk hasil API yang lebih konsisten, gunakan Live Server dan koneksi internet.
5. Klik **Tambah tugas**, isi form, lalu tekan **Simpan tugas**. Coba edit, hapus, tandai selesai, dan muat ulang halaman untuk menguji penyimpanan.

## Teknologi
- HTML5 untuk struktur halaman.
- CSS3 untuk tampilan responsif.
- JavaScript ES6+ untuk logika interaksi.
- `localStorage` untuk penyimpanan di browser.
- Open-Meteo dan DummyJSON sebagai API publik.

## Implementasi ES6+ (lokasi di `app.js`)
Nomor baris di bawah mengacu pada file `app.js` yang disertakan. Jika file diedit, nomor baris dapat berubah.

| Fitur | Contoh implementasi | Baris |
|---|---|---:|
| `const` | `const STORAGE_KEY` dan variabel lokal | 4, 25, 68–74 |
| `let` | Penghitung jumlah tugas selesai yang nilainya bertambah | sekitar 166 |
| Arrow functions | `loadTasks`, `saveTasks`, `bindEvents`, `render`, dan lainnya | 19–253 |
| Template literals | Rendering HTML dinamis dan pesan | 124–147, 158 |
| Async/await | `loadWeather`, `loadQuote` | 195–251 |
| Classes | `class TaskItem`, `class DashboardApp` | 6, 16 |
| Destructuring | `const { action, id }`, parameter `TaskItem` | 7, 96 |
| Spread operator | Memperbarui tugas secara immutable | 81, 110, 120 |
| Array methods | `map`, `filter`, `find`, `sort`, `forEach` | Berbagai bagian |
| `fetch()` | Mengambil data cuaca dan kutipan | 202, 239 |
| `localStorage` | `getItem`, `setItem` | 27, 34 |

> Catatan tugas: rubrik meminta `let` dan `const` digunakan dengan tepat. Kode memakai `const` untuk referensi yang tidak ditugaskan ulang dan `let` tidak diperlukan karena semua variabel lokal dapat menggunakan `const`. Jika dosen mengharuskan kata kunci `let` terlihat secara eksplisit, tambahkan contoh yang benar-benar dibutuhkan (misalnya penghitung `let index = 0` di loop), atau tanyakan apakah penggunaan `const` sesuai prinsip prefer-const dapat diterima.

## API yang digunakan
- Cuaca Open-Meteo: `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&timezone=Asia%2FJakarta`
- Kutipan DummyJSON: `https://dummyjson.com/quotes/random`

## Screenshot aplikasi
Jalankan aplikasi, lalu ambil screenshot tampilan browser:
- Windows: `Win + Shift + S`
- macOS: `Shift + Command + 4`
Simpan screenshot di folder proyek, misalnya `screenshot-dashboard.png`, lalu tambahkan gambar ke README dengan format:

```markdown
![Screenshot StudySpace](screenshot-dashboard.png)
```

## Pengujian sebelum dikumpulkan
- [ ] Tambah tugas berhasil.
- [ ] Edit tugas berhasil.
- [ ] Hapus tugas berhasil.
- [ ] Status selesai bisa diubah.
- [ ] Filter Semua/Berjalan/Selesai berfungsi.
- [ ] Tugas masih ada setelah halaman dimuat ulang.
- [ ] Cuaca dan kutipan tampil saat internet tersedia.
- [ ] Screenshot dimasukkan ke README.
