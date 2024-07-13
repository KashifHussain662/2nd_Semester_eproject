<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lawyers_Services";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $input['email'];
    $password = $input['password'];

    // Check in users table
    $sql_users = "SELECT * FROM users WHERE email = ?";
    if ($stmt_users = $conn->prepare($sql_users)) {
        $stmt_users->bind_param("s", $email);
        $stmt_users->execute();
        $result_users = $stmt_users->get_result();
        
        if ($result_users->num_rows > 0) {
            $user = $result_users->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                echo json_encode(["status" => "success", "user" => $user]);
                exit(); // Exit after successful login
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid password"]);
                exit();
            }
        }
        $stmt_users->close();
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
        exit();
    }

    // Check in lawyers table
    $sql_lawyers = "SELECT * FROM lawyers WHERE email = ?";
    if ($stmt_lawyers = $conn->prepare($sql_lawyers)) {
        $stmt_lawyers->bind_param("s", $email);
        $stmt_lawyers->execute();
        $result_lawyers = $stmt_lawyers->get_result();
        
        if ($result_lawyers->num_rows > 0) {
            $lawyer = $result_lawyers->fetch_assoc();
            if (password_verify($password, $lawyer['password'])) {
                echo json_encode(["status" => "success", "user" => $lawyer]);
                exit(); // Exit after successful login
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid password"]);
                exit();
            }
        } else {
            echo json_encode(["status" => "error", "message" => "No user found with that email"]);
            exit();
        }
        $stmt_lawyers->close();
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
        exit();
    }

    // If no user or lawyer found with the email
    echo json_encode(["status" => "error", "message" => "No user found with that email"]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
