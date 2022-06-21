<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");

	if(isset($_POST["userid"]))
	{
		$delete_one = $pdo->prepare("DELETE FROM lists WHERE userid = ? AND id = ?");
		$delete_one->execute([$_POST["userid"], $_POST["id"]]);
	}
?>