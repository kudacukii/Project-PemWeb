// Inisialisasi
import { updateAuthButtons } from './auth.js';
import { handleFormKampanye, editKampanye, hapusKampanye } from './kampanye.js';

// Data Kampanye (Disimpan di localStorage)
let kampanye = JSON.parse(localStorage.getItem('kampanye')) || [];

// Cek apakah pengguna sudah login
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'login.html';
}

// Tampilkan tombol login/logout
updateAuthButtons();

// Tampilkan daftar kampanye dengan pagination
tampilkanKampanyePagination(kampanye);

// Handle form kampanye
handleFormKampanye();

// Setup pagination
setupPagination();

// Event listener untuk pencarian
document.getElementById('searchInput').addEventListener('input', () => cariKampanye(kampanye));