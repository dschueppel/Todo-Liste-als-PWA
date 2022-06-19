<?php
    $pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
    $pdo->query("SET NAMES 'utf8mb4'");

    session_start();

    if(isset($_POST["loginName"]) && isset($_POST["loginPassword"]))
    {
        $checkUserExists = $pdo->prepare("SELECT count(*) FROM users WHERE name = ?");
        $getUserPassword = $pdo->prepare("SELECT password FROM users WHERE name = ?");
    
        $checkUserExists->execute([$_POST["loginName"]]);
        $sameUserAmount = $checkUserExists->fetch(PDO::FETCH_COLUMN|PDO::FETCH_NUM);

        if($sameUserAmount == 1)
        {
            $getUserPassword->execute([$_POST["loginName"]]);
            $passwordHash = $getUserPassword->fetch(PDO::FETCH_COLUMN);
            if(password_verify($_POST["loginPassword"], $passwordHash))
            {
                $getUserId = $pdo->prepare("SELECT id FROM users WHERE name = ?");
                $getUserId->execute([$_POST["loginName"]]);
                $id = $getUserId->fetch(PDO::FETCH_COLUMN);
                $_SESSION["userid"] = $id;

                $publishsession = $pdo->prepare("INSERT INTO sessions (sessionid, userid) VALUES (?, ?)");
                $publishsession->execute([session_id(), $id]);

                echo "success";
            }
            else
            {
                echo "Falsches Passwort!";
            }
        }
        else
        {
            echo "Den Benutzer gibt es nicht.";
        }
    }
?>