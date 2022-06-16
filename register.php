<?php
    $pdo = new PDO('mysql:host=localhost;dbname=todo_list', 'root', '');
    $pdo->query("SET NAMES 'utf8mb4'");

    session_start();
    
    if(isset($_POST["registerName"]) && isset($_POST["registerPassword"]) && isset($_POST["registerConfirmPassword"]))
    {
        $checkUserExists = $pdo->prepare("SELECT count(*) FROM users WHERE name = ?");
        $addUserToDatabase = $pdo->prepare("INSERT INTO users (name, password) VALUES (?, ?)");

        $checkUserExists->execute([$_POST["registerName"]]);
        $sameUserCount = $checkUserExists->fetch(PDO::FETCH_COLUMN|PDO::FETCH_NUM);
        $sameUser = $sameUserCount == 1;

        if(!$sameUser)
        {
            if($_POST["registerPassword"] === $_POST["registerConfirmPassword"])
            {
                $addUserToDatabase->execute([$_POST["registerName"], password_hash($_POST["registerPassword"], PASSWORD_BCRYPT)]);
                $getUserId = $pdo->prepare("SELECT id FROM users WHERE name = ?");
                $getUserId->execute([$_POST["registerName"]]);
                $id = $getUserId->fetch(PDO::FETCH_COLUMN);

                $publishsession = $pdo->prepare("INSERT INTO sessions (sessionid, userid) VALUES (?, ?)");
                $publishsession->execute([session_id(), $id]);
                
                $_SESSION["userid"] = $id;
                echo "success";
            }
            else
            {
                echo "Confirmation Password does not equal input Password!";
            }
        }
        else
        {
            echo "User already exists!";
        }
    }
?>