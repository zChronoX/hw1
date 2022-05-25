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
    <link rel="stylesheet" href="create_post.css">
    <script src="create_post.js" defer="true"></script>
</head>

<body>
    <header>

        <nav>
            <div class="l_nav">
                <a href="home.php">Home</a>
                <a href="create_post.php">Nuovo post</a><br><br>
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
    <section id="newpost">
        <form class='type_zero' name='form_post' method="POST">

            <h1>Scrivi qui un nuovo post!</h1>
            <label><input type='text' name='Titolo' class="TitleBox" placeholder="Titolo" id="titolo"></label>
            <span id="Title"></span>
            <label><textarea name='Testo' class="textBox" placeholder="Inserisci qui il testo"
                    id="testo"></textarea></label>
            <span id="main_text"></span>
            <div id="zero"><input type='submit' value='Invia'></div>

    </section>
    </form>


</body>

</html>