# REST API Mahasiswa dan Mata Kuliah

## Identitas Mahasiswa

| Keterangan | Informasi |
|---|---|
| Nama | Tarisa Menova |
| NIM | 124140039 |
| Kelas | RA |
| Mata Kuliah | Pemrograman Web |
| Repository GitHub | [pemrograman_web_itera_124140039](https://github.com/tarisa177/pemrograman_web_itera_124140039) |

## Deskripsi Project

Project ini merupakan tugas praktikum Pemrograman Web untuk membangun REST API menggunakan Python Pyramid dan PostgreSQL.

Aplikasi menyediakan fitur CRUD (*Create, Read, Update, Delete*) untuk mengelola data Mahasiswa dan Mata Kuliah. Data disimpan menggunakan PostgreSQL dengan SQLAlchemy sebagai ORM dan Alembic untuk mengelola migrasi database.

## Teknologi yang Digunakan

- Python 3.11
- Pyramid Framework
- PostgreSQL 16
- SQLAlchemy
- Alembic
- psycopg2
- PowerShell untuk pengujian API

## Struktur Database

### 1. Tabel Mahasiswa

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Integer | Primary Key, Auto Increment |
| nim | Text | Nomor Induk Mahasiswa, Unique |
| nama | Text | Nama mahasiswa |
| jurusan | Text | Jurusan mahasiswa |

### 2. Tabel Mata Kuliah

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Integer | Primary Key, Auto Increment |
| kode_mk | Text | Kode mata kuliah, Unique |
| nama_mk | Text | Nama mata kuliah |
| sks | Integer | Jumlah SKS |
| semester | Integer | Semester mata kuliah |

## Instalasi dan Konfigurasi

### 1. Clone Repository

```bash
git clone https://github.com/tarisa177/pemrograman_web_itera_124140039.git
```

Masuk ke folder project:

```powershell
cd Tarisa_Menova_124140039_pertemuan6/Tarisa_Menova_124140039_pertemuan6/pyramid_mahasiswa
```

### 2. Membuat Virtual Environment

```powershell
python -m venv venv
```

Aktifkan virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Install Dependencies

```powershell
python -m pip install --upgrade pip
pip install -e ".[testing]"
```

### 4. Konfigurasi Database

Pastikan PostgreSQL sudah berjalan.

Buat database dengan nama:

```text
pyramid_mahasiswa
```

Konfigurasi database pada `development.ini`:

```ini
sqlalchemy.url = postgresql+psycopg2://pyramid_user:pyramid_pass@localhost:5433/pyramid_mahasiswa
```

Sesuaikan username, password, dan port dengan konfigurasi PostgreSQL pada komputer.

### 5. Migrasi Database

Jalankan perintah:

```powershell
python -m alembic -c development.ini upgrade head
```

Perintah tersebut digunakan untuk membuat tabel berdasarkan migrasi Alembic.

### 6. Menjalankan Seed Database

Untuk memasukkan data awal mata kuliah, jalankan:

```powershell
initialize_pyramid_mahasiswa_db development.ini
```

Seed menyediakan data awal mata kuliah, seperti Algoritma dan Pemrograman, Struktur Data, dan Basis Data.

### 7. Menjalankan Server

```powershell
python -m pyramid.scripts.pserve development.ini --reload
```

Jika berhasil, aplikasi berjalan pada alamat:

```text
http://127.0.0.1:6543
```

## Daftar Endpoint REST API

Semua endpoint menggunakan alamat dasar:

```text
http://127.0.0.1:6543
```

### A. Endpoint Mahasiswa

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/mahasiswa` | Menampilkan seluruh mahasiswa |
| GET | `/api/mahasiswa/{id}` | Menampilkan mahasiswa berdasarkan ID |
| POST | `/api/mahasiswa` | Menambahkan mahasiswa |
| PUT | `/api/mahasiswa/{id}` | Mengubah data mahasiswa |
| DELETE | `/api/mahasiswa/{id}` | Menghapus mahasiswa |

Contoh JSON untuk POST Mahasiswa:

```json
{
  "nim": "124140039",
  "nama": "Tarisa Menova",
  "jurusan": "Teknik Informatika"
}
```

### B. Endpoint Mata Kuliah

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/matakuliah` | Menampilkan seluruh mata kuliah |
| GET | `/api/matakuliah/{id}` | Menampilkan mata kuliah berdasarkan ID |
| POST | `/api/matakuliah` | Menambahkan mata kuliah |
| PUT | `/api/matakuliah/{id}` | Mengubah data mata kuliah |
| DELETE | `/api/matakuliah/{id}` | Menghapus mata kuliah |

Contoh JSON untuk POST Mata Kuliah:

```json
{
  "kode_mk": "IF104",
  "nama_mk": "Pemrograman Web",
  "sks": 3,
  "semester": 4
}
```

## Valid