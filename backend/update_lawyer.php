<?php
// update_lawyer.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lawyers_Services";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$lawyerId = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$location = $_POST['location'];
$service = $_POST['service'];

$sql = "UPDATE lawyers SET name='$name', email='$email', location='$location', service='$service' WHERE id='$lawyerId'";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
