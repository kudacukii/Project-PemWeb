// Ambil data pengguna yang login dari sessionStorage
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

// Jika belum login, redirect ke login
if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = '../html/login.html';
} else {
    // Tampilkan data pengguna di profil
    document.getElementById('username').textContent = loggedInUser.username;
    document.getElementById('email').textContent = loggedInUser.email;

    // Ambil riwayat donasi pengguna dari localStorage
    const userDonasi = JSON.parse(localStorage.getItem(`donasi_${loggedInUser.email}`)) || [];

    // Tampilkan riwayat donasi
    const riwayatDonasiList = document.getElementById('riwayatDonasi');
    if (userDonasi.length > 0) {
        userDonasi.forEach(donasi => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Jenis Donasi:</strong> ${donasi.jenisDonasi}<br>
                <strong>Jumlah:</strong> Rp${donasi.jumlah}<br>
                <strong>Tanggal:</strong> ${donasi.tanggal}<br>
                <strong>Pesan:</strong> ${donasi.pesan || '-'}
            `;
            riwayatDonasiList.appendChild(li);
        });
    } else {
        riwayatDonasiList.innerHTML = '<li>Belum ada riwayat donasi.</li>';
    }

    // Ambil riwayat laporan pengguna dari localStorage
    const userLaporan = JSON.parse(localStorage.getItem(`laporan_${loggedInUser.email}`)) || [];

    // Tampilkan riwayat laporan
    const riwayatLaporanList = document.getElementById('riwayatLaporan');
    if (userLaporan.length > 0) {
        userLaporan.forEach(laporan => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Jenis Bencana:</strong> ${laporan.jenis}<br>
                <strong>Lokasi:</strong> ${laporan.kota}, ${laporan.provinsi}<br>
                <strong>Tanggal:</strong> ${laporan.tanggal}<br>
                <strong>Deskripsi:</strong> ${laporan.deskripsi || '-'}
            `;
            riwayatLaporanList.appendChild(li);
        });
    } else {
        riwayatLaporanList.innerHTML = '<li>Belum ada riwayat laporan.</li>';
    }
}