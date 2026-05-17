<?php
include 'connect.php';
session_start();

if(isset($_POST['signUp'])){
    $firstName = $_POST['fName'];
    $lastName  = $_POST['lName'];
    $email     = $_POST['email'];
    $password  = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email=?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $res = $stmt->get_result();

    if($res->num_rows > 0){
        echo "Email já existe!";
    } else {
        $stmt = $conn->prepare("INSERT INTO usuarios(firstName,lastName,email,password) VALUES (?,?,?,?)");
        $stmt->bind_param("ssss",$firstName,$lastName,$email,$password);
        $stmt->execute();
        header("Location: index.php");
    }
}

if(isset($_POST['signIn'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email=?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $res = $stmt->get_result();

    if($res->num_rows > 0){
        $user = $res->fetch_assoc();
        if(password_verify($password,$user['password'])){
            $_SESSION['email'] = $user['email'];
            header("Location: homepage.php");
        } else {
            echo "Senha incorreta!";
        }
    } else {
        echo "Usuário não encontrado!";
    }
}
?>