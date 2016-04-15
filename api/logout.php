<?php
	session_start();
	unset($_COOKIE['name']);
    setcookie('name', null, -1, '/');
	unset($_SESSION['loggedIn']);
	unset($_SESSION['oauth2state']);
	//header('Location: /');
?>