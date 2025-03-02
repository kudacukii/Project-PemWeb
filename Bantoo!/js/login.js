document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Ambil data pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Cari pengguna berdasarkan username
    const user = users.find(u => u.username === username && u.password === password);

    // Validasi login
    if (user) {
        alert('Login berhasil!');
        sessionStorage.setItem('loggedInUser', JSON.stringify(user)); // Simpan data pengguna yang login
        window.location.href = '../html/Bantoo!.html'; // Redirect ke beranda
    } else {
        alert('Username atau password salah!');
    }
});