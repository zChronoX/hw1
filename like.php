<?php 
    require_once 'authentication.php';
    header('Content-Type: application/json');
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }



if(isset($_GET["id_post"]))
{
   
    $conn = mysqli_connect($dbconfig['host'],$dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $id_post= mysqli_real_escape_string($conn, $_GET["id_post"]);
    //Controllo se l'utente ha messo like al post
    $query1= "SELECT * FROM likes WHERE postid = '$id_post' AND userid = '$userid'";
    $res1=mysqli_query($conn, $query1);
    if($res1 == false){
        $array=array();
        $array['postid']=$id_post;
        $array['error']=true;
        $array['error_type']='Errore inserimento like';
        echo json_encode($array);
        mysqli_close($conn);
        exit;
    }
    //Se l'utente ha già messo like a quel post, tolgo il like
    if(mysqli_num_rows($res1) > 0){
        $query1 ="DELETE FROM likes WHERE postid = '$id_post' AND userid = '$userid'";
        $res1=mysqli_query($conn, $query1);
        if($res1 == true){
            mysqli_close($conn);
            $array=array();
            $array['postid']=$id_post;
            $array['like']=false;
            echo json_encode($array);
            exit;

        }
        else{
            mysqli_close($conn);
            $array=array();
            $array['postid']=$id_post;
            $array['error']=true;
            $array['error_type']='Errore cancellazione like';
            echo json_encode($array);
            exit;
            
        }
    }
    //Se l'utente non ha messo il like a quel post, faccio mettere il like
    else{
        $query="INSERT INTO likes VALUES ('$id_post', '$userid')";
        $res=mysqli_query($conn, $query);
        if($res == true){
            mysqli_close($conn);
            $array=array();
            $array['postid']=$id_post;
            $array['like']=true;
            echo json_encode($array);
            exit;

 

        }
        else{
            mysqli_close($conn);
            $array=array();
            $array['postid']=$id_post;
            $array['error']=true;
            $array['error_type']='Errore inserimento like';
            echo json_encode($array);
            exit;
    
            }

        }

}
?>