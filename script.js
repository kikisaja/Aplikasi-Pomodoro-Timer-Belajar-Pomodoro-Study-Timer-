// --- 1. SELEKSI ELEMEN DOM ---
const elDisplayTeks = document.getElementById("time-display");
const elStatusBadge = document.getElementById("status-label");
const elTimerBox = document.getElementById("timer-box");
const elSessionCount = document.getElementById("session-count");

const btnModeFokus = document.getElementById("btn-mode-fokus");
const btnModeIstirahat = document.getElementById("btn-mode-istirahat");

const btnStart = document.getElementById("btn-start");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");

// --- 2. STATE KONFIGURASI DAN VARIABEL ---
const WAKTU_FOKUS = 25 * 60;     // 25 menit dalam detik (1500 detik)
const WAKTU_ISTIRAHAT = 5 * 60;  // 5 menit dalam detik (300 detik)

let sisaDetik = WAKTU_FOKUS;
let modeSaatIni = "fokus";       // 'fokus' atau 'istirahat'
let timerID = null;              // Menampung ID referensi setInterval
let jumlahSesiSelesai = 0;

// --- 3. FUNGSI LOGIKA UTAMA ---

// A. Format Angka Detik menjadi String MM:SS (misal: 1500 detik -> "25:00")
function formatWaktu(totalDetik) {
    const menit = Math.floor(totalDetik / 60);
    const detik = totalDetik % 60;

    // Tambahkan angka 0 di depan jika angka di bawah 10 (contoh: 09)
    const stringMenit = menit < 10 ? "0" + menit : menit;
    const stringDetik = detik < 10 ? "0" + detik : detik;

    return `${stringMenit}:${stringDetik}`;
}

// B. Render Tampilan Waktu
function perbaruiDisplayWaktu() {
    elDisplayTeks.innerText = formatWaktu(sisaDetik);
}

// C. Fungsi Jalankan Timer (Hitung Mundur)
function mulaiTimer() {
    if (timerID !== null) return; // Cegah timer ganda

    btnStart.classList.add("hidden");
    btnPause.classList.remove("hidden");

    timerID = setInterval(() => {
        sisaDetik--;
        perbaruiDisplayWaktu();

        // Cek jika waktu habis (detik mencapai 0)
        if (sisaDetik <= 0) {
            hentikanTimer();
            penangananWaktuHabis();
        }
    }, 1000);
}

// D. Fungsi Jeda Timer
function jedaTimer() {
    hentikanTimer();
    btnPause.classList.add("hidden");
    btnStart.classList.remove("hidden");
}

// E. Fungsi Hentikan Interval
function hentikanTimer() {
    clearInterval(timerID);
    timerID = null;
}

// F. Reset Timer
function resetTimer() {
    hentikanTimer();
    sisaDetik = (modeSaatIni === "fokus") ? WAKTU_FOKUS : WAKTU_ISTIRAHAT;
    perbaruiDisplayWaktu();
    
    btnPause.classList.add("hidden");
    btnStart.classList.remove("hidden");
}

// G. Logika Saat Waktu Berhasil Mencapai 00:00
function penangananWaktuHabis() {
    // Memutar suara beep sederhana dari browser
    alert(modeSaatIni === "fokus" ? "⏰ Waktu fokus selesai! Saatnya istirahat sejenak." : "🔔 Istirahat selesai! Mari kembali fokus belajar.");

    if (modeSaatIni === "fokus") {
        jumlahSesiSelesai++;
        elSessionCount.innerText = jumlahSesiSelesai;
        gantiMode("istirahat");
    } else {
        gantiMode("fokus");
    }
}

// H. Pengalih Mode (Fokus vs Istirahat)
function gantiMode(modeBaru) {
    hentikanTimer();
    modeSaatIni = modeBaru;

    if (modeSaatIni === "fokus") {
        sisaDetik = WAKTU_FOKUS;
        elStatusBadge.innerText = "MODE FOKUS 🎯";
        elTimerBox.style.backgroundColor = "var(--focus-bg)";
        btnModeFokus.classList.add("active");
        btnModeIstirahat.classList.remove("active");
    } else {
        sisaDetik = WAKTU_ISTIRAHAT;
        elStatusBadge.innerText = "MODE ISTIRAHAT ☕";
        elTimerBox.style.backgroundColor = "var(--break-bg)";
        btnModeIstirahat.classList.add("active");
        btnModeFokus.classList.remove("active");
    }

    perbaruiDisplayWaktu();
    btnPause.classList.add("hidden");
    btnStart.classList.remove("hidden");
}

// --- 4. BINDING EVENT LISTENERS ---
btnStart.addEventListener("click", mulaiTimer);
btnPause.addEventListener("click", jedaTimer);
btnReset.addEventListener("click", resetTimer);

btnModeFokus.addEventListener("click", () => gantiMode("fokus"));
btnModeIstirahat.addEventListener("click", () => gantiMode("istirahat"));

// Inisialisasi awal saat aplikasi dimuat
perbaruiDisplayWaktu();
