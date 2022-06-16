<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");

	session_start();

	$checksessionexists = $pdo->prepare("SELECT count(*) FROM sessions where sessionid = ?");
	$checksessionexists->execute([session_id()]);
	$amountsessions = $checksessionexists->fetch(PDO::FETCH_NUM|PDO::FETCH_COLUMN);

	if($amountsessions == 1)
	{
		echo "success";
	}

?>