<?php


//Questo file verrà utilizzato nella pagina di login per verificare se l'utente
//è loggato oppure no


require_once 'db.php';

    session_start();

    function checkAuth() {
        // Se esiste già una sessione, la ritorno, altrimenti ritorno 0
        if(isset($_SESSION['id'])) {
            return $_SESSION['id'];
        } else 
            return 0;
    }
?>