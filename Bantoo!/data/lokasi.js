
const lokasi = {
    provinsi: [
        {
            nama: "DKI Jakarta",
            kota: ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"]
        },
        {
            nama: "Jawa Barat",
            kota: ["Bandung", "Bogor", "Depok", "Bekasi", "Cimahi"]
        },
        {
            nama: "Jawa Tengah",
            kota: ["Semarang", "Surakarta", "Tegal", "Pekalongan", "Salatiga"]
        },
        {
            nama: "Jawa Timur",
            kota: ["Surabaya", "Malang", "Sidoarjo", "Madiun", "Kediri"]
        },
        {
            nama: "Bali",
            kota: ["Denpasar", "Badung", "Gianyar", "Tabanan", "Klungkung"]
        }
    ]
};

// Fungsi untuk mengisi dropdown provinsi
function isiProvinsi() {
    const provinsiSelect = document.getElementById('provinsi');
    lokasi.provinsi.forEach(prov => {
        const option = document.createElement('option');
        option.value = prov.nama;
        option.textContent = prov.nama;
        provinsiSelect.appendChild(option);
    });
}

// Fungsi untuk mengisi dropdown kota berdasarkan provinsi yang dipilih
function isiKota() {
    const kotaSelect = document.getElementById('kota');
    kotaSelect.innerHTML = '<option value="">Pilih Kota</option>'; // Reset dropdown kota

    const provinsiTerpilih = document.getElementById('provinsi').value;
    const provinsi = lokasi.provinsi.find(prov => prov.nama === provinsiTerpilih);

    if (provinsi) {
        provinsi.kota.forEach(kota => {
            const option = document.createElement('option');
            option.value = kota;
            option.textContent = kota;
            kotaSelect.appendChild(option);
        });
    }
}

// Panggil fungsi isiProvinsi saat halaman dimuat
isiProvinsi();

// Fungsi untuk menangani form laporan bencana
document.getElementById('formLaporan').addEventListener('submit', function (e) {
    e.preventDefault();

    // Cek apakah pengguna sudah login
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Anda harus login terlebih dahulu untuk melaporkan bencana!');
        window.location.href = '../html/login.html'; // Redirect ke halaman login
        return;
    }

    // Ambil nilai dari form
    const namaPelapor = document.getElementById('namaPelapor').value;
    const provinsi = document.getElementById('provinsi').value;
    const kota = document.getElementById('kota').value;
    const jenisBencana = document.getElementById('jenisBencana').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const kontak = document.getElementById('kontak').value;

    // Validasi input
    if (!namaPelapor || !provinsi || !kota || !jenisBencana || !deskripsi || !kontak) {
        alert('Harap isi semua field yang wajib diisi!');
        return; // Hentikan proses jika ada field yang kosong
    }

    // Jika semua field terisi, lanjutkan proses laporan
    const laporan = {
        nama: namaPelapor,
        provinsi: provinsi,
        kota: kota,
        jenis: jenisBencana,
        deskripsi: deskripsi,
        kontak: kontak,
        tanggal: new Date().toLocaleString()
    };

    // Simpan laporan ke localStorage (riwayat umum)
    let laporanBencana = JSON.parse(localStorage.getItem('laporanBencana')) || [];
    laporanBencana.push(laporan);
    localStorage.setItem('laporanBencana', JSON.stringify(laporanBencana));

    // Simpan laporan ke localStorage berdasarkan pengguna (riwayat profil)
    const email = loggedInUser.email; // Gunakan email pengguna yang login
    let userLaporan = JSON.parse(localStorage.getItem(`laporan_${email}`)) || [];
    userLaporan.push(laporan);
    localStorage.setItem(`laporan_${email}`, JSON.stringify(userLaporan));

    // Tambahkan marker ke peta (jika peta sudah dimuat)
    if (peta) {
        const lokasiMarker = cariKoordinat(laporan.kota);
        if (lokasiMarker) {
            new google.maps.Marker({
                position: lokasiMarker,
                map: peta,
                title: `${laporan.jenis} di ${laporan.kota}, ${laporan.provinsi}`
            });
        }
    }

    alert('Laporan Anda telah berhasil dikirim!');
    document.getElementById('formLaporan').reset(); // Reset form setelah pengiriman berhasil
    tampilkanInfoBencana(); // Perbarui tampilan info bencana
});

// Fungsi untuk mencari koordinat berdasarkan kota
function cariKoordinat(kota) {
    // Contoh data koordinat untuk beberapa kota
    const dataKoordinat = {
        "Jakarta Pusat": { lat: -6.186486, lng: 106.834091 },
        "Bandung": { lat: -6.914744, lng: 107.609810 },
        "Semarang": { lat: -6.966667, lng: 110.416664 },
        "Surabaya": { lat: -7.257472, lng: 112.752090 },
        "Denpasar": { lat: -8.670458, lng: 115.212631 }
    };

    return dataKoordinat[kota] || null;
}

// Fungsi untuk menampilkan informasi bencana terkini
function tampilkanInfoBencana() {
    const daftarBencana = document.getElementById('daftarBencana');
    const laporanBencana = JSON.parse(localStorage.getItem('laporanBencana')) || [];

    if (laporanBencana.length > 0) {
        daftarBencana.innerHTML = laporanBencana.map(laporan => `
            <div class="bencana-item">
                <h3>${laporan.jenis} di ${laporan.kota}, ${laporan.provinsi}</h3>
                <p><strong>Pelapor:</strong> ${laporan.nama}</p>
                <p><strong>Deskripsi:</strong> ${laporan.deskripsi}</p>
                <p><strong>Kontak:</strong> ${laporan.kontak}</p>
                <p><strong>Tanggal:</strong> ${laporan.tanggal}</p>
            </div>
        `).join('');
    } else {
        daftarBencana.innerHTML = '<p>Belum ada laporan bencana.</p>';
    }
}

// Data histori bencana
const historiBencana = [
    { lokasi: "Jakarta", jenis: "Banjir", tanggal: "2023-01-15", lat: -6.200000, lng: 106.816666 },
    { lokasi: "Sulawesi", jenis: "Gempa Bumi", tanggal: "2023-02-20", lat: -2.548926, lng: 118.014863 },
    { lokasi: "NTT", jenis: "Kekeringan", tanggal: "2023-03-10", lat: -10.177200, lng: 123.607033 }
];

// Fungsi untuk menampilkan histori bencana
function tampilkanHistoriBencana(data = historiBencana) {
    const daftarHistori = document.getElementById('daftarHistori');
    daftarHistori.innerHTML = data.map((bencana, index) => `
        <div class="histori-item" onclick="arahkanKePeta(${index})">
            <h3>${bencana.jenis} di ${bencana.lokasi}</h3>
            <p><strong>Tanggal:</strong> ${bencana.tanggal}</p>
        </div>
    `).join('');
}

// Fungsi untuk mencari histori bencana
function cariHistori() {
    const keyword = document.getElementById('searchHistori').value.toLowerCase();
    const hasil = historiBencana.filter(bencana => 
        bencana.lokasi.toLowerCase().includes(keyword) || 
        bencana.jenis.toLowerCase().includes(keyword)
    );
    tampilkanHistoriBencana(hasil);
}

// Fungsi untuk mengarahkan peta ke lokasi bencana
function arahkanKePeta(index) {
    const bencana = historiBencana[index];
    if (peta && bencana) {
        peta.setCenter({ lat: bencana.lat, lng: bencana.lng });
        peta.setZoom(12); // Perbesar zoom
        new google.maps.Marker({
            position: { lat: bencana.lat, lng: bencana.lng },
            map: peta,
            title: `${bencana.jenis} di ${bencana.lokasi}`
        });
    }
}

// Variabel global untuk peta
let peta;

// Fungsi untuk inisialisasi peta
function initMap() {
    peta = new google.maps.Map(document.getElementById('peta'), {
        zoom: 5,
        center: { lat: -2.548926, lng: 118.014863 } // Pusatkan peta di Indonesia
    });
}

// Load Google Maps API
function loadScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&callback=initMap`; // Ganti YOUR_API_KEY dengan API key Anda
    script.defer = true;
    document.head.appendChild(script);
}

// Panggil fungsi untuk memuat peta dan tampilkan data saat halaman dimuat
loadScript();
tampilkanInfoBencana();
tampilkanHistoriBencana();

