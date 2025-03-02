document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('donasiForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Cek apakah pengguna sudah login
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            alert('Anda harus login terlebih dahulu!');
            window.location.href = '../html/login.html';
            return;
        }

        const nama = document.getElementById('nama').value;
        const email = loggedInUser.email; // Gunakan email pengguna yang login
        const jenisDonasi = document.getElementById('jenisDonasi').value;
        const jumlah = document.getElementById('jumlah').value;
        const pesan = document.getElementById('pesan').value;

        // Validasi input
        if (!nama || !jenisDonasi || !jumlah) {
            alert('Harap isi semua field yang wajib diisi!');
            return;
        }

        // Buat objek donasi
        const donasi = {
            nama,
            email,
            jenisDonasi,
            jumlah,
            pesan,
            tanggal: new Date().toLocaleString()
        };

        // Simpan ke riwayat donasi umum
        let riwayatDonasi = JSON.parse(localStorage.getItem('riwayatDonasi')) || [];
        riwayatDonasi.push(donasi);
        localStorage.setItem('riwayatDonasi', JSON.stringify(riwayatDonasi));

        // Simpan riwayat donasi berdasarkan pengguna
        let userDonasi = JSON.parse(localStorage.getItem(`donasi_${email}`)) || [];
        userDonasi.push(donasi);
        localStorage.setItem(`donasi_${email}`, JSON.stringify(userDonasi));

        alert('Terima kasih, donasi Anda telah berhasil!');
        window.location.href = '../html/Bantoo!.html'; // Redirect ke beranda
    });
});
