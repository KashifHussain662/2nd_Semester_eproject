<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lawyers_Services";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$input = json_decode(file_get_contents('php://input'), true);
$lawyerId = $input['lawyer_id'] ?? '';

if (empty($lawyerId)) {
    echo json_encode(["status" => "error", "message" => "Lawyer ID is required"]);
    exit();
}

$sql = "SELECT * FROM appointments WHERE lawyer_id = '" . $conn->real_escape_string($lawyerId) . "'";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["status" => "error", "message" => "Error executing query: " . $conn->error]);
    exit();
}

$appointments = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }
} else {
    echo json_encode(["status" => "success", "message" => "No appointments found for this lawyer"]);
    exit();
}

echo json_encode($appointments);

$conn->close();
?>
