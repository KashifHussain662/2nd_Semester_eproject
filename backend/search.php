<?php
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
$location = $input['location'] ?? '';
$services = $input['services'] ?? '';

$sql = "SELECT id, name, email , location, service, img FROM lawyers WHERE 1=1";
if (!empty($location)) {
    $sql .= " AND location LIKE '%" . $conn->real_escape_string($location) . "%'";
}
if (!empty($services)) {
    $sql .= " AND service = '" . $conn->real_escape_string($services) . "'";
}

$result = $conn->query($sql);
$lawyers = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $lawyers[] = $row;
    }
}

echo json_encode($lawyers);

$conn->close();
?>
