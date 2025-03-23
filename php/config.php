<?php
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$database = "bantoo_db"; 

$conn = new mysqli($host, $user, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi ke database gagal: " . $conn->connect_error);
}
?>
