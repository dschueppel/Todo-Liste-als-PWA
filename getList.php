<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");
	$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	if(isset($_POST["userid"]))
	{
		$gettodos = $pdo->prepare("SELECT * FROM lists WHERE userid = ? ORDER BY id ASC");
		$gettodos->execute([$_POST["userid"]]);
		$data = $gettodos->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($data, true);
	}
?>