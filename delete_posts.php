<?php 
    require_once 'authentication.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }






if(isset($_GET["id_post"]))
{
   
$conn = mysqli_connect($dbconfig['host'],$dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $id_post= mysqli_real_escape_string($conn, $_GET["id_post"]);
    $query="DELETE FROM posts WHERE id= '".$id_post."'";
    $res=mysqli_query($conn, $query) or die(mysqli_error($conn));


    mysqli_close($conn);



}

?>