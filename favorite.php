<?php
require_once 'authentication.php';
if (!$userid = checkAuth()) {
    header("Location: login.php");
    exit;
}
?>

<html>




<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> GTech Tips</title>
    <link rel="shortcut icon" type="image/x-icon" href="images/logo.png" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="favorite.css">
    <script src="favorite.js" defer="true"></script>
</head>

<body>
    <header>

        <nav>
            <div class="l_nav">
                <a href="home.php">Home</a>
                <a href="create_post.php">Nuovo post</a>
                <a href="favorite.php">Preferiti</a><br><br>
            </div>
            <div class="middle_logo">
                <img src="images/logo.png">
            </div>
            <div class="r_nav">
                <a id="infoButton">About</a>
                <a href="logout.php">Logout</a>
            </div>
        </nav>
        <section id="infoView" class="hidden">
            <div>
                <p id="closeInfo">X</p>
                <p id="infoTitle">Info utili</p>
                <p><strong>Autore:</strong> Giovanni Maria Contarino</p>
                <p><strong>Matricola:</strong> 1000007029</p>
                <p><strong>Anno Accademico:</strong> 2021/2022</p>
                <p><strong>Università:</strong> Università degli Studi di Catania</p>

            </div>
        </section>
    </header>
    <section id="posts">
        <p id="posts_title"> Qui puoi trovare tutti i post a cui ai messo il Like!
        </p>
    </section>
</body>
</html>
