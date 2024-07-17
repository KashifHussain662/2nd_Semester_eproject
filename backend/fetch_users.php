<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lawyers_Services";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, name, email FROM users";
$result = $conn->query($sql);

$users = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
} else {
    echo "0 results";
}
$conn->close();

echo json_encode($users);
?>
