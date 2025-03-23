// profile.js
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Anda harus login terlebih dahulu!');
        window.location.href = '../html/login.html';
        return;
    }

    document.getElementById('username').textContent = loggedInUser.username;
    document.getElementById('email').textContent = loggedInUser.email;

    const userDonasi = JSON.parse(localStorage.getItem(`donasi_${loggedInUser.email}`)) || [];
    const riwayatDonasiList = document.getElementById('riwayatDonasi');
    riwayatDonasiList.innerHTML = userDonasi.length > 0 
        ? userDonasi.map(donasi => `<li><strong>${donasi.jenisDonasi}</strong>: Rp${donasi.jumlah} (${donasi.tanggal})</li>`).join('')
        : '<li>Belum ada riwayat donasi.</li>';
});
