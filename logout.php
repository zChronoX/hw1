<?php
    include 'db.php';

    // Distruggo la sessione esistente
    session_start();
    session_destroy();

    header('Location: login.php');
?>