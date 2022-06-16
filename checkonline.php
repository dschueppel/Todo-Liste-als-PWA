<?php
	$pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
	$pdo->query("SET NAMES 'utf8mb4'");

	session_start();

	if(isset($_SESSION["userid"]))
	{
		$checksession = $pdo->prepare("SELECT count(*) FROM sessions WHERE userid = ?");
		$checksession->execute([$_SESSION["userid"]]);

		$sessioncount = $checksession->fetch(PDO::FETCH_COLUMN|PDO::FETCH_NUM);

		if($sessioncount == 0)
		{
			echo "offline";
		}
		else
		{
			echo "online";
		}
	}

?>