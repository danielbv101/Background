<?php
include 'connect.php';
session_start();
if(!isset($_SESSION['email'])){
    http_response_code(401);
    echo json_encode(["error"=>"Unauthorized"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET':
        $res = $conn->query("SELECT * FROM produtos");
        $products = [];
        while($row = $res->fetch_assoc()){
            $products[] = $row;
        }
        echo json_encode($products);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO produtos(name,sector,quantity) VALUES (?,?,?)");
        $stmt->bind_param("ssi",$data['name'],$data['sector'],$data['quantity']);
        $stmt->execute();
        echo json_encode(["success"=>true]);
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);
        $stmt = $conn->prepare("UPDATE produtos SET name=?, sector=? WHERE id=?");
        $stmt->bind_param("ssi",$data['name'],$data['sector'],$_GET['id']);
        $stmt->execute();
        echo json_encode(["success"=>true]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM produtos WHERE id=?");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        echo json_encode(["success"=>true]);
        break;
}
?>