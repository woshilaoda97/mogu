<?php
include("dbHelper.php");
$db = new db;
$db->connect();
echo json_encode($db->selectAll('good'));