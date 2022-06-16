<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");

	session_start();

	if(isset($_SESSION["userid"]))
	{
		$getdata = $pdo->prepare("SELECT * FROM users WHERE id = ?");
		$getdata->execute([$_SESSION["userid"]]);
		$userdata = $getdata->fetch(PDO::FETCH_ASSOC);
		echo json_encode($userdata, true);
	}

?>