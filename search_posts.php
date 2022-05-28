<?php 
    require_once 'authentication.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }


    $conn = mysqli_connect($dbconfig['host'],$dbconfig['user'], $dbconfig['password'], $dbconfig['name']);


    $post = array();
    $post_name=mysqli_real_escape_string($conn, $_GET['search_post']);

//Query che mi restituisce tutte le info del post (contenuto e chi l'ha pubblicato), inserendo un carattere/parola contenuta nel testo
    $query = "SELECT users.id AS usersid, users.nome AS nome, users.username AS username,
    users.cognome AS cognome, posts.titolo AS titolo, posts.testo AS testo, posts.time AS tempo,
    posts.id AS postsid, EXISTS(SELECT userid FROM likes WHERE postid = posts.id AND userid = $userid) as liked
    FROM posts JOIN users on posts.userid = users.id WHERE testo like '%".$post_name."%' ORDER BY postsid DESC ";


$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

while($row = mysqli_fetch_assoc($res)){

$time=getTime($row['tempo']);


    $post[] = array('userid' => $row['usersid'], 'nome' => $row['nome'], 'cognome' => $row['cognome'], 'username' =>$row['username'],
    'titolo' => $row['titolo'], 'testo' => $row['testo'], 'tempo' => "$time", 'posts_id' => $row['postsid'], 'liked' =>$row['liked']);
} 


echo json_encode($post);
exit;



function getTime($timestamp) {      
    // Calcola il tempo trascorso dalla pubblicazione del post       
    $old = strtotime($timestamp); 
    $diff = time() - $old;           
    $old = date('d/m/y', $old);

    if ($diff /60 <1) {
        return intval($diff%60)." secondi fa";
    } else if (intval($diff/60) == 1)  {
        return "Un minuto fa";  
    } else if ($diff / 60 < 60) {
        return intval($diff/60)." minuti fa";
    } else if (intval($diff / 3600) == 1) {
        return "Un'ora fa";
    } else if ($diff / 3600 <24) {
        return intval($diff/3600) . " ore fa";
    } else if (intval($diff/86400) == 1) {
        return "Ieri";
    } else if ($diff/86400 < 30) {
        return intval($diff/86400) . " giorni fa";
    } else {
        return $old; 
    }
}





?>