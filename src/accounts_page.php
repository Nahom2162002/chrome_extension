<?php
    $servername = "localhost";
    $username = "nahom_a";
    $password = "Nahom0216!";
    $dbname = "accounts";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "CREATE TABLE loginInfo (email VARCHAR(255), username VARCHAR(255), password VARCHAR(255))";

    if ($conn->query($sql) == TRUE) {
        echo "Table loginInfo created successfully!";
    }
    else {
        echo "Error creating table: " . $conn->error;
    }

    $stmt = $conn->prepare("INSERT INTO loginInfo (column1, column2, column3) VALUES (?, ?, ?)");
    $value1 = $_POST('email');
    $value2 = $_POST('uname');
    $value3 = $_POST('password');

    $conn->close();
?>