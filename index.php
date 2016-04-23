<?php
	session_start();
	if(isset($_SESSION['user'])){
		header('Location: html/main.php');
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'>
	<link type='text/css' rel='stylesheet' href='css/login.css'>
	<link type='text/css' rel='stylesheet' href='css/forms.css'>
	<link type='text/css' rel='stylesheet' href='css/keyframes.css'>
	<style>
		g {
			color: green;
		}
		r {
			color: red;
		}
	</style>
<?php
	include 'html/config.php';
	$data = '';
	if(isset($_POST['login']) && isset($_POST['password'])){

		$login = clear($_POST['login']);
		$password = clear($_POST['password']);
		
		if($login !== '' && $password !== ''){
			if(isset($_POST['button:register'])){
				$result = $mysqli -> query("SELECT id FROM users WHERE login = '{$login}';");
				if($result -> num_rows === 0){
					$mysqli -> query("INSERT INTO users(login, password) VALUES ('{$login}', '{$password}');");
					if($mysqli -> affected_rows === 1){
						$data = "<g>User successfully registered.</g>"; 	
					} else {
						$data = "<r>User already exists. (impossible)</r>";
					}
				} else {
					$data = "<r>User already exists.</r>";
				}
			} else if(isset($_POST['button:login'])){
				$result = $mysqli->query("SELECT id, status FROM users WHERE login = '{$login}' AND password = '{$password}' AND status = 0;");
				if(!$result){
			        $data = "Incorrect login or password.";
				} else {
					$row = $result -> fetch_assoc();
					if($row['logged'] === '1'){
						$data = "This user is already logged in.";
					} else {
						$_SESSION['user'] = $row['id'];
						$_SESSION['userGroup'] = $row['userGroup'];
						if($_SESSION['user'] !== ''){
							$mysqli -> query("UPDATE users SET status = 1 WHERE id = '{$_SESSION['user']}';");
							header("Location: html/main.php");
						}	
					}
				}
			}
		}
	}
	$mysqli -> close();
?>

</head>
<body>

<form class='form appear' method='POST' action='index.php'>
	<div class='form-head'>
		<h2>Login</h2>
		<b><?php echo $data ?></b>
	</div>
	<div class='form-body'>
		<div class='form-body-left'>
			<span>Login:</span>
			<span>Password:</span>
		</div>
		<div class='form-body-right'>
			<input autocomplete='off' name='login'>
			<input autocomplete='off' name='password' type='password'>
		</div>
	</div>
	<div class='form-bottom'>
		<input name='button:login' value='Let me in' type='submit'>
		<input name='button:register' value='Register (use given credentials)' type='submit'>
	</div>
</form>
</body>
</html>