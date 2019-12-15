<?php
include('dbHelper.php');
if(isset($_GET['sid'])){
    $db = new db;
    $db->connect();
    $sid = $_GET['sid'];
    $res = $db->selectAll('taobaopic',null,"sid={$sid}");
    echo json_encode($res);
}else{
    echo "非法访问";
}