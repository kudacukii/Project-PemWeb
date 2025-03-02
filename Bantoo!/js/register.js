document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Validasi input
    if (!username || !email || !password) {
        alert('Harap isi semua field yang wajib diisi!');
        return;
    }

    // Simpan data pengguna ke localStorage
    const user = { username, email, password };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registrasi berhasil! Silakan login.');
    window.location.href = '../html/login.html'; // Redirect ke halaman login
});