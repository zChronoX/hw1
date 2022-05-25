<?php
    // Verifica che l'utente sia già loggato, in caso positivo va direttamente alla home
    include 'authentication.php';
    if (checkAuth()) {
        header('Location: home.php');
        exit;
    }

    if (!empty($_POST["username"]) && !empty($_POST["password"]) )
    {
        // Se username e password sono stati inviati
        // Connessione al DB
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
        // Preparazione 
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $query = "SELECT id, username, password FROM users WHERE username = '$username'";
        // Esecuzione
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        if (mysqli_num_rows($res) > 0) {
            // Ritorna una sola riga, il che ci basta perché l'utente autenticato è solo uno
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['password'])) //Alternativa non funzionante a causa dell'hash:  if($_POST['password'] === $entry['password'])
             {


                // Imposto una sessione dell'utente
                $_SESSION["username"] = $entry['username'];
                $_SESSION["id"] = $entry['id'];
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        // Se l'utente non è stato trovato o la password non ha passato la verifica
        $error = "Username e/o password errati.";
    }
    else if (isset($_POST["username"]) || isset($_POST["password"])) {
        // Se solo uno dei due è impostato
        $error = "Inserisci username e password.";
    }

?>


<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Login - GTech Tips - </title>
    <link rel="shortcut icon" type="image/x-icon" href="images/logo.png" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link rel="stylesheet" href="login.css">
    <script src="login.js" defer></script>
</head>

<body>

    <div class="box_login">


        <div class="login_copy">
            <h3>Effettua il login per continuare</h3>
        </div>

        <div class="login">



            <div class="login_logo">
                <img src="images/logo.png" alt="">
            </div>



            <form action="login.php" class='type_zero' name='form_dati' method="POST">
                <?php
         if(isset($error))
         {
           echo "<span name='notExists_php' class='errore'>";
           echo $error;
           echo "</span>";
         }
        ?>
                <label><input type='text' name='username' class="textBox" placeholder="Username" id="username"></label>
                <span id="textUser"></span>
                <div class="wrapper">
                    <label><input type='password' name='password' class="textBox" placeholder="Password"
                            id="password"></label>
                    <span>
                        <i class="fa fa-eye" aria-hidden="true" id="eye"></i>
                    </span>
                </div>
                <span id="textPassword"></span>
                <div class='checkbox'>
                    <label><input type="checkbox" id='check' name="ricordami" value="remember">Ricordami</label>
                </div>

                <div id="zero"><input type='submit' value='Accedi'></div>
                <div class="option">OR</div>
            </form>

            <div class="fblink">
                <span class="fab fa-facebook"></span>
                <a href="work_in_progress.php">Log in with Facebook</a>
            </div>
            <div class="glink">
                <span class="fab fa-google"></span>
                <a href="work_in_progress.php">Log in with Google</a>
            </div>


            <div class="forget-id">
                <a href="work_in_progress.php">Password dimenticata</a>
            </div>

            <div class='signup'>
                <p> Non hai un account? <a href="register.php"> Iscriviti!</a> </p>
            </div>

        </div>
    </div>

</body>

</html>