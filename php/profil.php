<?php
session_start();
include 'config.php'; // Koneksi ke database

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Ambil data pengguna dari database
$user_id = $_SESSION['user_id'];
$query = "SELECT username, email FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Ambil riwayat donasi pengguna
$query_donasi = "SELECT campaigns.nama AS campaign, donasi.jumlah, donasi.metode_pembayaran, donasi.tanggal_donasi 
                 FROM donasi 
                 JOIN campaigns ON donasi.campaign_id = campaigns.id
                 WHERE donasi.user_id = ?
                 ORDER BY donasi.tanggal_donasi DESC";
$stmt_donasi = $conn->prepare($query_donasi);
$stmt_donasi->bind_param("i", $user_id);
$stmt_donasi->execute();
$result_donasi = $stmt_donasi->get_result();
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil Saya - Bantoo</title>
    <link rel="stylesheet" href="../css/style.css"> <!-- Pastikan file CSS ada -->
</head>
<body>
    <div class="container">
        <h2>Profil Pengguna</h2>
        <p><strong>Username:</strong> <?php echo htmlspecialchars($user['username']); ?></p>
        <p><strong>Email:</strong> <?php echo htmlspecialchars($user['email']); ?></p>
        <a href="dashboard.php">Kembali ke Dashboard</a>
        <a href="logout.php" class="logout-btn">Logout</a>

        <h3>Riwayat Donasi</h3>
        <table border="1">
            <tr>
                <th>Nama Campaigns</th>
                <th>Jumlah Donasi</th>
                <th>Metode Pembayaran</th>
                <th>Tanggal</th>
            </tr>
            <?php while ($donasi = $result_donasi->fetch_assoc()) : ?>
            <tr>
                <td><?php echo htmlspecialchars($donasi['campaign']); ?></td>
                <td>Rp<?php echo number_format($donasi['jumlah'], 2, ',', '.'); ?></td>
                <td><?php echo htmlspecialchars($donasi['metode_pembayaran']); ?></td>
                <td><?php echo htmlspecialchars($donasi['tanggal_donasi']); ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>
</body>
</html>
