# ⏳ Pomodoro Study Timer (Interval Timing & State Management)

Aplikasi **Pomodoro Study Timer** interaktif yang dirancang untuk teknik manajemen waktu belajar (25 menit fokus dan 5 menit istirahat).

Proyek latihan ini dikembangkan khusus bagi siswa SMK Jurusan Rekayasa Perangkat Lunak (RPL/PPLG) Kelas XI untuk melatih pemahaman fungsi waktu asinkronus (`setInterval`) dan eksekusi callback pada JavaScript.

---

## 🎯 Target Belajar & Konsep RPL

1. **Asynchronous Timing Logic (`setInterval` & `clearInterval`):** Mengelola siklus detak waktu secara berulang per 1000 milidetik (1 detik) serta menghentikannya secara aman agar tidak mengakibatkan kebocoran memori (*memory leak*).
2. **Time Unit Conversion Math:** Mengonversi data numerik detik tunggal menjadi representasi format tampilan menit dan detik (`MM:SS`) menggunakan operasi pembagian `Math.floor()` dan sisa bagi (*modulus* `%`).
3. **Application State Machine:** Mengatur transisi perubahan status aplikasi dari *Mode Fokus* menuju *Mode Istirahat* beserta penyesuaian gaya visual secara otomatis.
4. **Interactive UI Toggling:** Mengelola visibilitas tombol *Start* dan *Pause* secara bergantian untuk menghindari pemicuan timer berlapis.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Kerangka tombol saklar mode, display waktu, dan panel kontrol
├── style.css        # Desain layout pop-art, token warna mode fleksibel, dan gaya tombol
└── script.js        # Engine hitung mundur setInterval, konversi MM:SS, dan pengalih mode
