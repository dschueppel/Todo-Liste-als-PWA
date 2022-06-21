<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");

	if(isset($_POST["userid"]))
	{
		$addtodo = $pdo->prepare("UPDATE lists SET done=?, flag_important=?, priority=?, hex_color=?, date=?, time=?, todo_text=? WHERE userid = ? AND id = ?");
		$addtodo->execute([$_POST["done"], $_POST["flag_imp"], $_POST["priority"], $_POST["hex_color"], ($_POST["mydate"] ?: NULL), ($_POST["mytime"] ?: NULL), ($_POST["mytodo"] ?: NULL), $_POST["userid"], $_POST["id"]]);
		$listdata = $addtodo->fetch(PDO::FETCH_ASSOC);
		echo json_encode($listdata, true);
	}
?>