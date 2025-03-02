// Data Kampanye (Disimpan di localStorage)
let kampanye = JSON.parse(localStorage.getItem('kampanye')) || [];

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
    const id = document.getElementById('kampanyeId').value;
    const nama = document.getElementById('nama').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const target = document.getElementById('target').value;

    if (!nama || !deskripsi || !target) {
        alert('Semua field harus diisi!');
        return;
    }

    if (id) {
        // Edit kampanye
        kampanye[id] = { nama, deskripsi, target };
        alert('Kampanye berhasil diubah!');
    } else {
        // Tambah kampanye baru
        kampanye.push({ nama, deskripsi, target });
        alert('Kampanye berhasil ditambahkan!');
    }

    localStorage.setItem('kampanye', JSON.stringify(kampanye));
    tampilkanKampanye();
    formKampanye.reset();
    document.getElementById('kampanyeId').value = '';
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
    const nama = document.getElementById('editNama').value;
    const deskripsi = document.getElementById('editDeskripsi').value;
    const target = document.getElementById('editTarget').value;

    if (!nama || !deskripsi || !target) {
        alert('Semua field harus diisi!');
        return;
    }

    // Update data kampanye yang sedang diedit
    kampanye[kampanyeYangSedangDiedit] = { nama, deskripsi, target };
    localStorage.setItem('kampanye', JSON.stringify(kampanye));
    alert('Kampanye berhasil diubah!');
    tampilkanKampanye();
    tutupPopup(); // Tutup pop-up setelah menyimpan perubahan
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
