<?php
session_start();
include 'config.php'; // Koneksi database

// Pastikan user sudah login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

/* 
   ============== 
   LOGIKA CRUD 
   ==============
*/

// === CREATE: Tambah campaigns ===
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['create'])) {
    $nama = $_POST['nama'];
    $deskripsi = $_POST['deskripsi'];
    $target_donasi = $_POST['target_donasi'];

    // Upload foto (jika ada)
    $fotoPath = null;
    if (!empty($_FILES['foto']['name'])) {
        $foto = $_FILES['foto']['name'];
        $tmp_name = $_FILES['foto']['tmp_name'];
        $fotoPath = "uploads/" . basename($foto);
        move_uploaded_file($tmp_name, "../" . $fotoPath);
    }

    $sql = "INSERT INTO campaigns (user_id, nama, deskripsi, target_donasi, foto) 
            VALUES ('$user_id', '$nama', '$deskripsi', '$target_donasi', '$fotoPath')";
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Campaigns berhasil ditambahkan!');</script>";
    } else {
        echo "<script>alert('Gagal menambahkan campaigns.');</script>";
    }
}

// === UPDATE: Edit campaigns ===
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update'])) {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $deskripsi = $_POST['deskripsi'];
    $target_donasi = $_POST['target_donasi'];

    // Cek apakah ada foto baru
    if (!empty($_FILES['foto']['name'])) {
        $foto = $_FILES['foto']['name'];
        $tmp_name = $_FILES['foto']['tmp_name'];
        $fotoPath = "uploads/" . basename($foto);
        move_uploaded_file($tmp_name, "../" . $fotoPath);

        $sql = "UPDATE campaigns 
                SET nama='$nama', deskripsi='$deskripsi', target_donasi='$target_donasi', foto='$fotoPath'
                WHERE id='$id' AND user_id='$user_id'";
    } else {
        // Tidak ada upload foto baru
        $sql = "UPDATE campaigns 
                SET nama='$nama', deskripsi='$deskripsi', target_donasi='$target_donasi'
                WHERE id='$id' AND user_id='$user_id'";
    }

    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Campaigns berhasil diupdate!');</script>";
    } else {
        echo "<script>alert('Gagal mengupdate campaigns.');</script>";
    }
}

// === DELETE: Hapus campaigns ===
if (isset($_GET['delete'])) {
    $deleteId = $_GET['delete'];
    $sql = "DELETE FROM campaigns WHERE id='$deleteId' AND user_id='$user_id'";
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Campaigns berhasil dihapus!');</script>";
    } else {
        echo "<script>alert('Gagal menghapus campaigns.');</script>";
    }
}

// === READ: Ambil semua campaigns milik user ===
$result = mysqli_query($conn, "SELECT * FROM campaigns WHERE user_id='$user_id' ORDER BY id DESC");
$campaigns = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>List Campaigns</title>
    <!-- Tambahkan CSS Global -->
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/footer.css">
    <!-- CSS Khusus Campaigns -->
    <link rel="stylesheet" href="../css/campaigns.css">
</head>
<body>
    <header>
        <h1>Bantoo!</h1>
        <nav>
            <a href="dashboard.php">Beranda</a>
            <a href="list_campaigns.php">Campaigns</a>
            <a href="profil.php">Profil</a>
        </nav>
    </header>

    <main class="container">
        <h2>List Campaigns</h2>

        <!-- Form Tambah Campaigns -->
        <div class="form-container">
            <form method="POST" enctype="multipart/form-data" class="form-campaign">
                <h3>Tambah Campaigns Baru</h3>
                <input type="hidden" name="create" value="1">
                
                <label>Nama Campaigns:</label>
                <input type="text" name="nama" required>
                
                <label>Deskripsi:</label>
                <textarea name="deskripsi"></textarea>
                
                <label>Target Donasi (Rp):</label>
                <input type="number" name="target_donasi" step="0.01" required>





                
                <label>Foto (opsional):</label>
                <input type="file" name="foto">
                
                <button type="submit">Simpan</button>
            </form>
        </div>

        <hr>

        <!-- Daftar Campaigns -->
        <h3>Daftar Campaigns Saya</h3>
        <ul id="listcampaigns" class="campaign-list">
        <?php foreach ($campaigns as $item): ?>
            <li class="campaign-item">
                <div class="campaign-info">
                    <strong><?php echo $item['nama']; ?></strong><br>
                    Deskripsi: <?php echo $item['deskripsi']; ?><br>
                    Target Donasi: Rp<?php echo number_format($item['target_donasi'], 2, ',', '.'); ?><br>
                    <?php if (!empty($item['foto'])): ?>
                        <img src="<?php echo $item['foto']; ?>" alt="Foto Campaigns" width="100"><br>
                    <?php endif; ?>
                </div>
                
                <!-- Form Update -->
                <form method="POST" enctype="multipart/form-data" class="form-campaign update-form">
                    <input type="hidden" name="update" value="1">
                    <input type="hidden" name="id" value="<?php echo $item['id']; ?>">

                    <!-- Simpan nilai lama di data-old-value -->
                    <label>Nama Campaigns:</label>
                    <input type="text" 
                           name="nama" 
                           value="<?php echo $item['nama']; ?>" 
                           data-old-value="<?php echo htmlspecialchars($item['nama'], ENT_QUOTES); ?>"
                           required>
                    
                    <label>Deskripsi:</label>
                    <textarea name="deskripsi" 
                              data-old-value="<?php echo htmlspecialchars($item['deskripsi'], ENT_QUOTES); ?>">
                        <?php echo $item['deskripsi']; ?>
                    </textarea>
                    
                    <label>Target Donasi (Rp):</label>
                    <input type="number" 
                           name="target_donasi" 
                           value="<?php echo $item['target_donasi']; ?>" 
                           data-old-value="<?php echo $item['target_donasi']; ?>"
                           required>
                    
                    <label>Foto (opsional):</label>
                    <input type="file" name="foto">
                    
                    <button type="submit">Update</button>
                </form>
                
                <!-- Link Delete -->
                <a href="?delete=<?php echo $item['id']; ?>" 
                   onclick="return confirm('Yakin ingin menghapus campaigns ini?')">
                   Hapus
                </a>
            </li>
        <?php endforeach; ?>
        </ul>
    </main>

    <footer>
        <p>&copy; 2025 Bantoo!. Semua hak dilindungi.</p>
    </footer>

    <!-- Tambahkan script untuk cek perubahan saat update -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const updateForms = document.querySelectorAll('.update-form');
        
        updateForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let changed = false;
                
                // Cari input text, number, textarea
                form.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(field => {
                    const oldVal = (field.getAttribute('data-old-value') || '').trim();
                    const newVal = field.value.trim();
                    if (oldVal !== newVal) {
                        changed = true;
                    }
                });
                
                // Jika tidak ada perubahan
                if (!changed) {
                    e.preventDefault();
                    alert('Anda tidak mengubah apapun.');
                    return;
                }
                
                // Jika ada perubahan, konfirmasi
                if (!confirm('Yakin ingin mengubah data?')) {
                    e.preventDefault();
                }
            });
        });
    });
    </script>
</body>
</html>
