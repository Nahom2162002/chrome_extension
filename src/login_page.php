<?php
    $servername = "localhost";
    $username = "nahom_a";
    $password = "Nahom0216!";
    $dbname = "accounts";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>