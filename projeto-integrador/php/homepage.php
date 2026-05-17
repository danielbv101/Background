<?php
session_start();
if(!isset($_SESSION['email'])){
    header("Location: index.php");
    exit();
}
include 'connect.php';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Produtos</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<button id="logout-btn">Logout</button>
<h1>Bem-vindo, <?php echo $_SESSION['email']; ?></h1>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Quantidade</th>
<th>Setor</th>
<th>Status</th>
<th>Ações</th>
</tr>
</thead>
<tbody></tbody>
</table>
<script src="js/app.js"></script>
</body>
</html>