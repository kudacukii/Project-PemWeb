<?php
include 'config.php';

// CREATE User
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['create'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo "User berhasil dibuat.";
    } else {
        echo "Error: " . $conn->error;
    }
}

// READ Users
if (isset($_GET['read'])) {
    $result = $conn->query("SELECT id, username, email, created_at FROM users");
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
}

// UPDATE User
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update'])) {
    $id = $_POST['id'];
    $username = $_POST['username'];
    $email = $_POST['email'];

    $sql = "UPDATE users SET username='$username', email='$email' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "User berhasil diperbarui.";
    } else {
        echo "Error: " . $conn->error;
    }
}

// DELETE User
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['delete'])) {
    $id = $_POST['id'];
    $sql = "DELETE FROM users WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "User berhasil dihapus.";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
