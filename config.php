<?php
function clear($text){
	if(get_magic_quotes_gpc()){
		$text = stripslashes($text);
	}
	$text = trim($text);
	$text = htmlspecialchars($text); //dezaktywujemy kod html
	return $text;
}

$mysqli = new mysqli('localhost', 'root', '', 'readtool');
if(mysqli_connect_errno()){
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
// or die('MySQL refused to cooperate.');
?>