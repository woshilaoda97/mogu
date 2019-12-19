<?php
include('dbHelper.php');
if(isset($_GET['gid'])){
    $db = new db;
    $db->connect();
    $gid = $_GET['gid'];
    $res = $db->selectAll('good',null,"gid={$gid}");
    echo json_encode($res);
}else{
    echo "非法访问";
}