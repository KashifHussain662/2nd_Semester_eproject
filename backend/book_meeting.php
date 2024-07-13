<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lawyers_Services";

// Establish database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    $response = ["success" => false, "message" => "Connection failed: " . $conn->connect_error];
    echo json_encode($response);
    exit();
}

// Parse input JSON data
$input = json_decode(file_get_contents('php://input'), true);
$clientName = $input['client_name'] ?? '';
$clientEmail = $input['client_email'] ?? '';
$meetingDate = $input['meeting_date'] ?? '';
$meetingTime = $input['meeting_time'] ?? '';
$lawyerId = $input['lawyer_id'] ?? '';

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO appointments (client_name, client_email, meeting_date, meeting_time, lawyer_id) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssssi", $clientName, $clientEmail, $meetingDate, $meetingTime, $lawyerId);

$response = ["success" => false, "message" => ""];

// Execute SQL statement
if ($stmt->execute()) {
    $response["success"] = true;
    $response["message"] = "Appointment booked successfully!";
} else {
    $response["message"] = "Error: " . $stmt->error;
}

// Close statement and database connection
$stmt->close();
$conn->close();

// Return JSON response
echo json_encode($response);
?>
