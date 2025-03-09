// Data kampanye default (jika belum ada data di localStorage)
const dataKampanyeDefault = [
    {
        id: 1,
        nama: "Banjir di Jakarta",
        lokasi: "Jakarta",
        deskripsi: "Banjir melanda Jakarta, ribuan warga membutuhkan bantuan darurat.",
        gambar: "url_gambar_banjir.jpg",
        target: 500000000, // Contoh target donasi
        tanggal: "2023-10-01"
    },
    {
        id: 2,
        nama: "Gempa di Sulawesi",
        lokasi: "Sulawesi",
        deskripsi: "Gempa berkekuatan 6,5 SR mengguncang Sulawesi Tengah.",
        gambar: "url_gambar_gempa.jpg",
        target: 300000000, // Contoh target donasi
        tanggal: "2023-09-25"
    },
    {
        id: 3,
        nama: "Kekeringan di NTT",
        lokasi: "NTT",
        deskripsi: "Kekeringan melanda Nusa Tenggara Timur, warga kesulitan mendapatkan air bersih.",
        gambar: "url_gambar_kekeringan.jpg",
        target: 200000000, // Contoh target donasi
        tanggal: "2023-09-20"
    }
];

// Fungsi untuk memuat data kampanye dari localStorage atau menggunakan data default
function muatDataKampanye() {
    try {
        // Cek apakah data kampanye sudah ada di localStorage
        let kampanye = JSON.parse(localStorage.getItem('kampanye')) || [];

        // Jika belum ada data, tambahkan data default ke localStorage
        if (kampanye.length === 0) {
            localStorage.setItem('kampanye', JSON.stringify(dataKampanyeDefault));
            kampanye = dataKampanyeDefault; // Perbarui variabel kampanye dengan data default
        }

        return kampanye;
    } catch (error) {
        console.error('Gagal memuat data kampanye:', error);
        return [];
    }
}

// Fungsi untuk menampilkan daftar kampanye di halaman
function tampilkanDaftarKampanye() {
    const daftarBencanaContainer = document.getElementById('daftarBencana');
    if (!daftarBencanaContainer) {
        console.error('Elemen daftarBencana tidak ditemukan.');
        return;
    }

    const daftarKampanye = muatDataKampanye();

    if (daftarKampanye.length > 0) {
        daftarBencanaContainer.innerHTML = daftarKampanye.map(kampanye => `
            <div class="kategori-item">
                <img src="${kampanye.gambar}" alt="${kampanye.nama}" class="kampanye-gambar">
                <h3>${kampanye.nama}</h3>
                <p><strong>Deskripsi:</strong> ${kampanye.deskripsi}</p>
                <p><strong>Target Donasi:</strong> Rp${kampanye.target.toLocaleString()}</p>
                <button onclick="location.href='../html/donasi.html?kampanye=${encodeURIComponent(kampanye.nama)}'" class="donasi-button">Donasi Sekarang</button>
            </div>
        `).join('');
    } else {
        daftarBencanaContainer.innerHTML = '<p>Belum ada kampanye bencana yang dibuat.</p>';
    }
}

// Jalankan fungsi tampilkanDaftarKampanye saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', tampilkanDaftarKampanye);