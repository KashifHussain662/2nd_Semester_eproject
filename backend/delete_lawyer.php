<?php
// delete_lawyer.php
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

$sql = "DELETE FROM lawyers WHERE id='$lawyerId'";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>
