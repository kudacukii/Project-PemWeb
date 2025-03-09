// Data kampanye default (jika belum ada data di localStorage)
const dataKampanyeDefault = [
    {
        id: 1,
        nama: "Banjir di Jakarta",
        lokasi: "Jakarta",
        deskripsi: "Banjir melanda Jakarta, ribuan warga membutuhkan bantuan darurat.",
        gambar: "url_gambar_banjir.jpg",
        tanggal: "2023-10-01"
    },
    {
        id: 2,
        nama: "Gempa di Sulawesi",
        lokasi: "Sulawesi",
        deskripsi: "Gempa berkekuatan 6,5 SR mengguncang Sulawesi Tengah.",
        gambar: "url_gambar_gempa.jpg",
        tanggal: "2023-09-25"
    },
    {
        id: 3,
        nama: "Kekeringan di NTT",
        lokasi: "NTT",
        deskripsi: "Kekeringan melanda Nusa Tenggara Timur, warga kesulitan mendapatkan air bersih.",
        gambar: "url_gambar_kekeringan.jpg",
        tanggal: "2023-09-20"
    }
];

// Cek apakah data kampanye sudah ada di localStorage
let kampanye = JSON.parse(localStorage.getItem('kampanye')) || [];

// Jika belum ada data, tambahkan data default ke localStorage
if (kampanye.length === 0) {
    localStorage.setItem('kampanye', JSON.stringify(dataKampanyeDefault));
    kampanye = dataKampanyeDefault; // Perbarui variabel kampanye dengan data default
}

// Elemen HTML
const formKampanye = document.getElementById('formKampanye');
const listKampanye = document.getElementById('listKampanye');
const searchInput = document.getElementById('searchInput');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Pop-up Edit
const editPopup = document.getElementById('editPopup');
const editForm = document.getElementById('editForm');
let kampanyeYangSedangDiedit = null; // Untuk menyimpan index kampanye yang sedang diedit

// Pagination
let currentPage = 1;
const itemsPerPage = 5;

// Fungsi untuk menampilkan kampanye dengan pagination & pencarian
function tampilkanKampanye(data = kampanye) {
    listKampanye.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <img src="${item.gambar}" alt="${item.nama}" style="width: 100px; height: auto; border-radius: 8px;">
                <strong>${item.nama}</strong>
                <p>${item.deskripsi}</p>
                <p>Target: Rp${item.target}</p>
            </div>
            <div>
                <button onclick="bukaPopupEdit(${index + start})">Edit</button>
                <button onclick="hapusKampanye(${index + start})">Hapus</button>
            </div>
        `;
        listKampanye.appendChild(li);
    });

    // Update pagination info
    pageInfo.textContent = `Halaman ${currentPage} dari ${Math.ceil(data.length / itemsPerPage)}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage >= Math.ceil(data.length / itemsPerPage);
}

// Fungsi untuk menambahkan/mengedit kampanye
formKampanye.addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil nilai dari form
    const id = document.getElementById('kampanyeId').value;
    const nama = document.getElementById('nama').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const target = document.getElementById('target').value;
    const gambar = document.getElementById('gambar').files[0];

    // Validasi input
    if (!nama || !deskripsi || !target || !gambar) {
        alert('Semua field harus diisi!');
        return;
    }

    // Baca gambar sebagai URL
    const reader = new FileReader();
    reader.onload = function (e) {
        const gambarURL = e.target.result;

        if (id) {
            // Edit kampanye
            kampanye[id] = { nama, deskripsi, target, gambar: gambarURL };
            alert('Kampanye berhasil diubah!');
        } else {
            // Tambah kampanye baru
            kampanye.push({ nama, deskripsi, target, gambar: gambarURL });
            alert('Kampanye berhasil ditambahkan!');
        }

        localStorage.setItem('kampanye', JSON.stringify(kampanye));
        tampilkanKampanye();
        formKampanye.reset();
        document.getElementById('kampanyeId').value = '';
    };
    reader.readAsDataURL(gambar); // Baca file gambar
});

// Fungsi untuk membuka pop-up edit
function bukaPopupEdit(index) {
    const item = kampanye[index];
    document.getElementById('editNama').value = item.nama;
    document.getElementById('editDeskripsi').value = item.deskripsi;
    document.getElementById('editTarget').value = item.target;
    kampanyeYangSedangDiedit = index; // Simpan index kampanye yang sedang diedit
    editPopup.style.display = 'flex'; // Tampilkan pop-up
}

// Fungsi untuk menutup pop-up edit
function tutupPopup() {
    editPopup.style.display = 'none'; // Sembunyikan pop-up
}

// Fungsi untuk menyimpan perubahan dari pop-up edit
editForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil nilai dari form edit
    const nama = document.getElementById('editNama').value;
    const deskripsi = document.getElementById('editDeskripsi').value;
    const target = document.getElementById('editTarget').value;
    const gambar = document.getElementById('editGambar').files[0];

    // Validasi input
    if (!nama || !deskripsi || !target) {
        alert('Semua field harus diisi!');
        return;
    }

    // Jika ada gambar baru, baca sebagai URL
    if (gambar) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const gambarURL = e.target.result;
            kampanye[kampanyeYangSedangDiedit] = { nama, deskripsi, target, gambar: gambarURL };
            localStorage.setItem('kampanye', JSON.stringify(kampanye));
            alert('Kampanye berhasil diubah!');
            tampilkanKampanye();
            tutupPopup();
        };
        reader.readAsDataURL(gambar);
    } else {
        // Jika tidak ada gambar baru, gunakan gambar lama
        kampanye[kampanyeYangSedangDiedit] = { nama, deskripsi, target, gambar: kampanye[kampanyeYangSedangDiedit].gambar };
        localStorage.setItem('kampanye', JSON.stringify(kampanye));
        alert('Kampanye berhasil diubah!');
        tampilkanKampanye();
        tutupPopup();
    }
});

// Fungsi untuk menghapus kampanye
function hapusKampanye(index) {
    if (confirm('Apakah Anda yakin ingin menghapus kampanye ini?')) {
        kampanye.splice(index, 1);
        localStorage.setItem('kampanye', JSON.stringify(kampanye));
        alert('Kampanye berhasil dihapus!');
        tampilkanKampanye();
    }
}

// Fungsi untuk mencari kampanye
function cariKampanye() {
    const keyword = searchInput.value.toLowerCase();
    const hasil = kampanye.filter(item => item.nama.toLowerCase().includes(keyword));
    currentPage = 1; // Reset ke halaman pertama saat mencari
    tampilkanKampanye(hasil);
}

// Event Listener untuk pencarian
searchInput.addEventListener('input', cariKampanye);

// Pagination
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        tampilkanKampanye();
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(kampanye.length / itemsPerPage)) {
        currentPage++;
        tampilkanKampanye();
    }
});

// Tampilkan data saat halaman dimuat
tampilkanKampanye();