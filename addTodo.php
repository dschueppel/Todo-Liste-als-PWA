<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");

	if(isset($_POST["userid"]))
	{
		$addtodo = $pdo->prepare("INSERT INTO lists (userid) VALUES(?)");
		$addtodo->execute([$_POST["userid"]]);
		
		$getmaxid = $pdo->prepare("SELECT id FROM lists ORDER BY id DESC LIMIT 0, 1");
		$getmaxid->execute();
		$data = $getmaxid->fetchAll(PDO::FETCH_NUM);
		echo json_encode($data, true);
	}
?>