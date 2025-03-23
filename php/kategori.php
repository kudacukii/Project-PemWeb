<?php 
include '../php/config.php'; // Koneksi ke database
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kategori Donasi</title>
    <link rel="stylesheet" href="../css/global.css">
</head>
<body>
    <header>
        <h1>Kategori Donasi</h1>
    </header>
    <main>
        <ul>
            <?php
            $query = "SELECT * FROM kategori";  
            $result = mysqli_query($conn, $query);

            while ($row = mysqli_fetch_assoc($result)) {
                echo "<li>{$row['nama']}</li>";  
            }
            ?>
        </ul>
    </main>
    <footer>
        <p>&copy; 2025 Bantoo! Semua hak dilindungi.</p>
    </footer>
</body>
</html>
