<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");


	if(isset($_POST["id"]))
	{
		$setoffline = $pdo->prepare("DELETE FROM sessions WHERE userid = ?");
		$setoffline->execute([$_POST["id"]]);

		session_abort();
	}
?>