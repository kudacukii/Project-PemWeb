// Fungsi untuk menampilkan tombol login/logout
function updateAuthButtons() {
    const authButtons = document.getElementById('authButtons');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Jika pengguna sudah login, tampilkan tombol logout
        authButtons.innerHTML = `<button onclick="logout()" class="logout-button">Logout</button>`;
    } else {
        // Jika pengguna belum login, tampilkan tombol login
        authButtons.innerHTML = `<a href="../html/login.html" class="login-button">Login</a>`;
    }
}

// Fungsi untuk logout
function logout() {
    sessionStorage.removeItem('loggedInUser');
    alert('Anda telah logout.');
    window.location.href = '../html/Bantoo!.html'; // Redirect ke beranda
}

// Fungsi untuk memeriksa apakah pengguna sudah login
function checkLogin() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Anda harus login terlebih dahulu!');
        window.location.href = '../html/login.html'; // Redirect ke halaman login
        return false; // Pengguna belum login
    }
    return true; // Pengguna sudah login
}

// Panggil fungsi saat halaman dimuat
updateAuthButtons();