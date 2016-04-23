<?php
	include 'config.php';
	session_start();
	if(isset($_SESSION['user'])){
		$mysqli -> query("UPDATE users SET status = 0 WHERE id = {$_SESSION['user']};");
		unset($_SESSION['user']);
		unset($_SESSION['userGroup']);
		$mysqli -> close();
	}
	header('Location: ../index.php');
?>