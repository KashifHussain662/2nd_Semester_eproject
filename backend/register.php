<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$passwordDB = "";
$dbname = "lawyers_Services";

$conn = new mysqli($servername, $username, $passwordDB, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit();
}

$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);
$role = $_POST['role'];
$location = isset($_POST['location']) ? $_POST['location'] : '';
$service = isset($_POST['service']) ? $_POST['service'] : '';
$created_at = date("Y-m-d H:i:s");
$img = "";

if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
    $img = 'uploads/' . basename($_FILES['img']['name']);
    if (!move_uploaded_file($_FILES['img']['tmp_name'], $img)) {
        echo json_encode(["status" => "error", "message" => "Failed to upload image"]);
        exit();
    }
}

if ($role === 'lawyer') {
    // Insert into lawyers table
    $stmt = $conn->prepare("INSERT INTO lawyers (name, email, password, role, location, service, created_at, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $name, $email, $password, $role, $location, $service, $created_at, $img);
} else {
    // Insert into users table (assuming 'customer')
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, role, created_at, img) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $password, $role, $created_at, $img);
}

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Registration successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
