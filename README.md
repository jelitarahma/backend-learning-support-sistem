# Dokumentasi API Learning Support System

Selamat datang di dokumentasi API untuk sistem pendukung pembelajaran (Learning Support System).

## Penjelasan Peran (Roles)

API ini mendukung Role-Based Access Control (RBAC) untuk mengamankan data:

1.  **ADMIN**:
    *   Memiliki akses penuh ke semua data dan fungsi CRUD.
    *   Satu-satunya role yang bisa mengelola **Kategori** (IPA, IPS, dll).
    *   Bisa memantau seluruh aktivitas user dan sistem.

2.  **TEACHER (Guru)**:
    *   Dapat mengelola konten pembelajaran: **Mata Pelajaran**, **Bab**, **Materi**, serta **Quiz/Soal**.
    *   Memiliki izin untuk membuat, memperbarui, dan menghapus materi yang mereka kelola.

3.  **STUDENT (Siswa)**:
    *   Hanya akses baca (Read-only) untuk Mata Pelajaran, Bab, dan Materi.
    *   Dapat mengerjakan Quiz dan melihat hasil/progress belajar mereka sendiri.

---

---

## Cara Menjalankan Project (Local Development)

### 1. Clone Project
```bash
git clone https://github.com/jelitarahma/backend-learning-support-sistem.git
cd backend-learning-support-sistem
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment (`.env`)
Buat file `.env` di root project dan isi variabel berikut:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 4. Seed Data Data Awal
Jalankan perintah berikut untuk mengisi database dengan data kategori dan mata pelajaran dasar:
```bash
npm run seed
```

### 5. Menjalankan Server
```bash
npm run dev
```

---

## Endpoint API

Setiap request (kecuali Login/Register) membutuhkan Header:
`Authorization: Bearer <token>`

### 1. Autentikasi (`/api/auth`)
*   **Register**
    *   `POST /register`
    *   **Body**:
        ```json
        {
          "email": "user@example.com",
          "username": "jeje",
          "password": "password123",
          "fullName": "Jelita Rahma",
          "role": "STUDENT",
          "schoolInfo": {
            "schoolId": "ID_SEKOLAH_DARI_DB",
            "class": "12 IPA 1",
            "academicYear": "2025/2026"
          }
        }
        ```
*   **Login**
    *   `POST /login`
    *   **Body**:
        ```json
        {
          "email": "user@example.com",
          "password": "password123"
        }
        ```

### 2. Kategori (`/api/categories`)
*   **Ambil Daftar Kategori**
    *   `GET /`
*   **Ambil Detail Kategori**
    *   `GET /:id`
*   **Tambah Kategori (ADMIN)**
    *   `POST /`
    *   **Body**:
        ```json
        {
          "name": "IPA",
          "code": "SCIENCE",
          "description": "Ilmu Pengetahuan Alam",
          "thumbnail": "https://link-gambar.com/ipa.jpg"
        }
        ```
*   **Update Kategori (ADMIN)**
    *   `PUT /:id`
    *   **Body**: (Sama seperti POST, kirim field yang ingin diubah)

### 3. Mata Pelajaran / Mapel (`/api/subjects`)
*   **Ambil Semua Mapel**
    *   `GET /`
*   **Tambah Mapel (ADMIN/TEACHER)**
    *   `POST /`
    *   **Body**:
        ```json
        {
          "name": "Fisika",
          "code": "PHYS-12",
          "categoryId": "ID_KATEGORI_DARI_DB",
          "description": "Fisika kelas 12 semester 1",
          "thumbnail": "https://link-gambar.com/fisika.jpg"
        }
        ```
*   **Update Mapel (ADMIN/TEACHER)**
    *   `PUT /:id`
    *   **Body**: (Sama seperti POST)

### 4. Bab / Chapter (`/api/chapters`)
*   **Ambil Daftar Bab**
    *   `GET /?subjectId=...`
*   **Ambil Detail Bab**
    *   `GET /:id`
*   **Tambah Bab (ADMIN/TEACHER)**
    *   `POST /`
    *   **Body**:
        ```json
        {
          "subjectId": "ID_MAPEL_DARI_DB",
          "title": "Kinematika Gerak",
          "description": "Belajar tentang gerak benda",
          "orderNumber": 1,
          "estimatedTime": 60,
          "difficulty": "INTERMEDIATE"
        }
        ```
*   **Update Bab (ADMIN/TEACHER)**
    *   `PUT /:id`
    *   **Body**: (Sama seperti POST)

### 5. Materi (`/api/materials`)
*   **Ambil Materi per Bab**
    *   `GET /?chapterId=...`
*   **Tambah Materi (ADMIN/TEACHER)**
    *   `POST /`
    *   **Body**:
        ```json
        {
          "chapterId": "ID_BAB_DARI_DB",
          "title": "Gerak Lurus Beraturan",
          "content": "Isi materi dalam bentuk teks atau HTML...",
          "type": "VIDEO",
          "mediaUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "orderNumber": 1,
          "status": "PUBLISHED",
          "metadata": {
            "readTime": 15,
            "difficulty": "BASIC",
            "tags": ["Gerak", "Fisika"]
          }
        }
        ```
*   **Update Materi (ADMIN/TEACHER)**
    *   `PUT /:id`
    *   **Body**: (Sama seperti POST)

### 6. Quiz & Soal (`/api/quizzes`)
*   **Ambil Semua Quiz**
    *   `GET /`
*   **Ambil Detail Quiz**
    *   `GET /:id`
*   **Buat Quiz (ADMIN/TEACHER)**
    *   `POST /`
    *   **Body**:
        ```json
        {
          "materialId": "ID_MATERI_DARI_DB",
          "title": "Latihan Gerak Lurus",
          "description": "Quiz untuk mengetes pemahaman bab 1",
          "timeLimit": 30,
          "passingScore": 75,
          "difficulty": "BASIC",
          "status": "PUBLISHED"
        }
        ```
*   **Update Quiz (ADMIN/TEACHER)**
    *   `PUT /:id`
    *   **Body**: (Sama seperti POST, kirim field yang ingin diubah)
*   **Hapus Quiz (ADMIN/TEACHER)**
    *   `DELETE /:id`

*   **Ambil Detail Soal (ADMIN/TEACHER)**
    *   `GET /questions/:id`
*   **Tambah Soal (ADMIN/TEACHER)**
    *   `POST /questions`
    *   **Body**:
        ```json
        {
          "quizId": "ID_QUIZ_DARI_DB",
          "questionText": "Apa satuan kecepatan dalam SI?",
          "questionType": "MULTIPLE_CHOICE",
          "options": [
            { "optionText": "m/s", "isCorrect": true },
            { "optionText": "km/h", "isCorrect": false }
          ],
          "explanation": "Meter per second adalah satuan standar SI untuk kecepatan.",
          "points": 10,
          "orderNumber": 1
        }
        ```
*   **Update Soal (ADMIN/TEACHER)**
    *   `PUT /questions/:id`
    *   **Body**: (Sama seperti POST)
*   **Hapus Soal (ADMIN/TEACHER)**
    *   `DELETE /questions/:id`

*   **Submit Jawaban Quiz (STUDENT)**
    *   `POST /submit`
    *   **Body**:
        ```json
        {
          "quizId": "ID_QUIZ_DARI_DB",
          "answers": [
            { "questionId": "ID_SOAL_1", "selectedOption": "m/s" },
            { "questionId": "ID_SOAL_2", "selectedOption": "XYZ" }
          ]
        }
        ```

---

## Catatan Penting
*   **Media Assets**: Gunakan link penuh (URL) di field `mediaUrl`. Untuk YouTube, disarankan menggunakan format embed link.
*   **Vercel Support**: Sistem dirancang tanpa local upload (link-only) agar kompatibel penuh saat di-deploy ke Vercel atau platform serverless lainnya.
