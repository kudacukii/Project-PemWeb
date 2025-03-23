<?php 
include '../php/config.php'; // Koneksi ke database
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lokasi Bencana</title>
    <link rel="stylesheet" href="../css/global.css">
</head>
<body>
    <header>
        <h1>Lokasi Bencana</h1>
    </header>
    <main>
        <div class="lokasi-container">
            <?php
            $query = "SELECT * FROM lokasi_bencana";  
            $result = mysqli_query($conn, $query);

            while ($row = mysqli_fetch_assoc($result)) {
                echo "<div class='lokasi-item'>";
                echo "<img src='../foto/{$row['foto']}' alt='{$row['nama']}' width='200'>";
                echo "<h3>{$row['nama']}</h3>";
                echo "<p>{$row['deskripsi']}</p>";
                echo "</div>";
            }
            ?>
        </div>
    </main>
    <footer>
        <p>&copy; 2025 Bantoo! Semua hak dilindungi.</p>
    </footer>
</body>
</html>
