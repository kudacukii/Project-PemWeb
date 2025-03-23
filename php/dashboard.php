<?php
session_start();
include 'config.php'; // Koneksi database

// Pastikan user sudah login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Ambil data user
$user_id = $_SESSION['user_id'];
$queryUser = "SELECT username, email FROM users WHERE id = $user_id";
$resultUser = $conn->query($queryUser);
$user = $resultUser->fetch_assoc();

// (Opsional) Ringkasan donasi user
$queryDonasi = "SELECT COUNT(*) AS total_donasi, SUM(jumlah) AS total_jumlah
                FROM donasi
                WHERE user_id = $user_id";
$resultDonasi = $conn->query($queryDonasi);
$donasi = $resultDonasi->fetch_assoc();
$totalDonasi = $donasi['total_donasi'] ?? 0;
$totalJumlah = $donasi['total_jumlah'] ?? 0;

$conn->close();
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Bantoo!</title>
    <!-- Tambahkan CSS global jika perlu -->
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/footer.css">
    <!-- Panggil file CSS khusus dashboard -->
    <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>
<header>
    <h1>Bantoo!</h1>
    <nav>
        <a href="dashboard.php">Beranda</a>
        <a href="list_campaigns.php">Campaigns</a>
        <a href="profil.php">Profil</a>
        <a href="logout.php">Logout</a>
    </nav>
</header>

<main class="dashboard-container">
    <h2>Selamat Datang, <?php echo htmlspecialchars($user['username']); ?>!</h2>
    <p>Email: <?php echo htmlspecialchars($user['email']); ?></p>

    <div class="summary-box">
        <h3>Ringkasan Donasi Anda</h3>
        <p>Total Donasi: <?php echo (int)$totalDonasi; ?> kali</p>
        <p>Total Jumlah Donasi: Rp<?php echo number_format($totalJumlah, 2, ',', '.'); ?></p>
    </div>

    <h3>Apa yang ingin Anda lakukan?</h3>
    <div class="actions">
        <div class="action-card">
            <a href="list_campaigns.php">Kelola Campaigns</a>
        </div>
        <div class="action-card">
            <a href="profil.php">Lihat Profil</a>
        </div>
        <div class="action-card">
            <a href="lokasi.php">Cek Lokasi Bencana</a>
        </div>
        <div class="action-card">
            <a href="kategori.php">Lihat Kategori</a>
        </div>
    </div>
</main>

<footer>
    <p>&copy; 2025 Bantoo!. Semua hak dilindungi.</p>
</footer>
</body>
</html>
