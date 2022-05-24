<?php
    require_once 'authentication.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }


if (!empty($_POST["Titolo"]) && !empty($_POST["Testo"])){


$conn = mysqli_connect($dbconfig['host'],$dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$num_error = 0;

$title=mysqli_real_escape_string($conn, $_POST['Titolo']);
$text=mysqli_real_escape_string($conn, $_POST['Testo']);
$userid = mysqli_real_escape_string($conn, $userid);




if (strlen($_POST["Titolo"]) < 4)
{
$num_error = $num_error + 1;
}

if (strlen($_POST["Testo"]) < 10)
{
$num_error = $num_error + 1;
}


if($num_error == 0){


$query= "INSERT INTO posts (id, titolo, testo, userid) VALUES ('','$title', '$text','.$userid.')";
$res = mysqli_query($conn, $query) or die("Errore:" .mysqli_error($conn));
header("Location: home.php");
mysqli_free_result($res);
mysqli_close($conn);



}







}

?>