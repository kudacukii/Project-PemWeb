<?php
include 'config.php';

// CREATE Donasi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['create'])) {
    $user_id = $_POST['user_id'];
    $campaign_id = $_POST['campaign_id'];
    $jumlah = $_POST['jumlah'];
    $metode_pembayaran = $_POST['metode_pembayaran'];
    $pesan = $_POST['pesan'];

    $sql = "INSERT INTO donasi (user_id, campaign_id, jumlah, metode_pembayaran, pesan) 
            VALUES ('$user_id', '$campaign_id', '$jumlah', '$metode_pembayaran', '$pesan')";
    if ($conn->query($sql) === TRUE) {
        echo "Donasi berhasil dilakukan.";
    } else {
        echo "Error: " . $conn->error;
    }
}

// READ Donasi
if (isset($_GET['read'])) {
    $result = $conn->query("SELECT * FROM donasi");
    $donasi = [];
    while ($row = $result->fetch_assoc()) {
        $donasi[] = $row;
    }
    echo json_encode($donasi);
}

// UPDATE Donasi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update'])) {
    $id = $_POST['id'];
    $jumlah = $_POST['jumlah'];
    $metode_pembayaran = $_POST['metode_pembayaran'];

    $sql = "UPDATE donasi SET jumlah='$jumlah', metode_pembayaran='$metode_pembayaran' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "Donasi berhasil diperbarui.";
    } else {
        echo "Error: " . $conn->error;
    }
}

// DELETE Donasi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['delete'])) {
    $id = $_POST['id'];
    $sql = "DELETE FROM donasi WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "Donasi berhasil dihapus.";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
