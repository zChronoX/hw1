<?php

//Data in cui è stata effettuata la registrazione

$data_registrazione = date("d-m-Y");

require 'db.php';
//Controllo che non vi siano dati mancanti

if (!empty($_POST["Nome"]) && !empty($_POST["Cognome"]) && !empty($_POST["Username"])
&& !empty($_POST["Password"]) && !empty($_POST["cPassword"]) && !empty($_POST["Email"]) && !empty($_POST["Genere"])){

//Mi connetto al database

$conn = mysqli_connect($dbconfig['host'],$dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

//Variabile che mi serve per tener traccia degli errori
//Viene incrementata ad ogni errore

$num_error = 0;

//Leggo lo username e verifico che non sia già presente nel db attraverso una query

$username = mysqli_real_escape_string($conn, $_POST['Username']);
$query = "SELECT username FROM users WHERE username = '$username'";
$res = mysqli_query($conn, $query) or die("Errore:" .mysqli_error($conn));

//Controllo il numero di righe: se il valore è maggiore di 0, l'username è stato usato

if(mysqli_num_rows($res) > 0)
{
  $error = "Username già in uso!";
  $num_error = $num_error + 1;
}


//Controllo che la password abbia almeno 4 caratteri

if (strlen($_POST["Password"]) < 4)
{
  $error = "Errore durante l'inserimento della password. Inserisci almeno 4 caratteri";
  $num_error = $num_error + 1;
}


//Controllo che le password inserite siano uguali

if (strcmp($_POST["Password"], $_POST["cPassword"]) != 0)
{
  $error = "Le password non coincidono, hai già dimenticato la tua password?!";
  $num_error = $num_error + 1;

}

//Controllo che la mail non sia stata utilizzata (stesso discorso dello username)

$email = mysqli_real_escape_string($conn, $_POST['Email']);
$query = "SELECT email FROM users WHERE email = '$email'";
$res = mysqli_query($conn, $query);

if(mysqli_num_rows($res) > 0)
{
  $error = "Email già in uso!";
  $num_error = $num_error + 1;
}


//Controllo che non vi siano errori

if($num_error == 0)
{
  # Leggiamo tutte le altre stringhe di cui non abbiamo fatto l'escape
  $name = mysqli_real_escape_string($conn, $_POST["Nome"]);
  $cognome = mysqli_real_escape_string($conn, $_POST["Cognome"]);
  $gender = mysqli_real_escape_string($conn, $_POST["Genere"]);
  $password = mysqli_real_escape_string($conn, $_POST["Password"]); 
  $password = password_hash($password, PASSWORD_BCRYPT);

//Inserisco i valori nel db ed eseguo la query

        $query = "INSERT INTO users VALUES('', '$name', '$cognome', '$username', '$password', '$email', '$gender', '$data_registrazione')";
  
        if(mysqli_query($conn, $query))
        {
          $_SESSION["username"] = $_POST['Username'];
  //Memorizzo l'id dell'utente grazie ad "mysqli_insert_id"

          $_SESSION["id"] = mysqli_insert_id($conn);
  
          //Termino la connessione
          mysqli_close($conn);
          $msg = "Benvenuto $username";
        }
      }
    }













?>




<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Registrazione - GTech Tips - </title>
    <link rel="shortcut icon" type="image/x-icon" href="images/logo.png" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link rel="stylesheet" href="register.css">
    <script src="register.js" defer></script>
</head>


<body>
    <div id="scroll"></div>

    <div class="login_box">
        <div class="register">
            <div class="register_title">
                <h2>Crea il tuo nuovo account</h2>
                <p>Compila correttamente il form per registrarti!</p>
            </div>
            <div class="register_logo">
                <img src="images/logo.png" alt="">
            </div>
            <form action="register.php" id='form' class='type_zero' name='form_dati' method='post'>
                <?php

if(isset($msg))
{
 echo "<span name='welcome_php' class='okay'>";
 echo $msg;
 echo "</span>";
}
else
{
 echo "<span name='welcome_php' class='okay hidden'>";
 echo $msg;
 echo "</span>";
}


if(isset($error))
{
  echo "<span name='notExists_php' class='errore'>";
  echo $error;
  echo "</span>";
}
else
{
  echo "<span name='notExists_php' class='errore hidden'>";
  echo $error;
  echo "</span>";
}


?>



                <div class="user_box">
                    <label><input type='text' name='Nome' class="textBox" placeholder="Nome" id="Nome"></label>
                    <span id="textUser"></span>

                    <label><input type='text' name='Cognome' class="textBox" placeholder="Cognome" id="Cognome"></label>
                    <span id="textSurname"></span>
                </div>



                <div class="user_box2">
                    <div class='username'>
                        <label><input type='text' name='Username' class="textBox" placeholder="Username" id="Username" <?php 
                                if(!empty($_POST["username"])){
                                    echo "value=".$_POST["username"];
                                }
                            ?>>
                        </label>
                        <span id="textUsername"></span>
                    </div>
                    <div class="wrapper">
                        <label><input type='password' name='Password' class="textBox" placeholder="Password"
                                id="Password"></label>
                        <span id='p'>
                            <i class="fa fa-eye" aria-hidden="true" id="eyeP"></i>
                        </span>
                        <span id="textPassword"></span>
                    </div>
                </div>

                <div class="verifyPassword">
                    <label><input type='password' name='cPassword' class="textBox" placeholder="Conferma Password"
                            id="cPassword"></label>
                    <span id="textPassC"></span>
                </div>

                <div class="user_mail">

                    <label><input type='text' name='Email' class="textBox" id="email" placeholder="E-Mail" <?php 
           if(!empty($_POST["email"])){
            echo "value=".$_POST["email"];
        }
           ?>></label>
                    <span id="textEmail"></span>
                </div>

                <h3 class='gb'>Genere</h3>
                <div class="gender_box">
                    <label><input type="radio" class='genere' name="Genere" value="Maschio"> Maschio</label>
                    <label><input type="radio" class='genere' name="Genere" value="Femmina"> Femmina</label>
                </div>


                <div id="zero"><input type='submit' name='submit' value='Registrati'></div>

            </form>
            <div class='signup'>
                <p> Hai già un account? <a href="login.php"> Accedi!</a></p>
            </div>
        </div>
    </div>
</body>

</html>