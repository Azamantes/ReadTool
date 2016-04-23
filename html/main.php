<?php
	session_start();

	if(!isset($_SESSION['user'])){
		header('Location: ../index.php');
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'>
	<link rel='stylesheet' href='../css/keyframes.css' type='text/css'>
	<link rel='stylesheet' href='../css/sky.css' type='text/css'>
	<link rel='stylesheet' href='../css/classes.css' type='text/css'>
	<link rel='stylesheet' href='../css/tags.css' type='text/css'>
	<link rel='stylesheet' href='../css/ids.css' type='text/css'>
	<!-- <link rel='stylesheet' href='build/css/styles.css' type='text/css'> -->
	<link rel='stylesheet' href='../css/forms.css' type='text/css'>
	<link rel='stylesheet' href='../css/main.css' type='text/css'>

	<?php
		if(isset($_SESSION['user'])){
			echo "<script>const USER_ID = parseInt(" . $_SESSION['user'] . ");</script>\n";
		}
	?>

	<script src='/Libraries/jscolor/jscolor.js'></script>
	<script src='/Libraries/Mithril.js/mithril.min.js'></script>
 	<script src='../js/script.js'></script>
	<style>
		g { color: green }
		r { color: red }
	</style>
</head>
<body>
	<div id='topbar-container' class='field'>
		<div id='topbar' class='relative'>
			<div class='topbar-language'>
				<span></span>
				<div id='language_to' class='dropdown' event='Language To'></div>
			</div>
			<div class='topbar-language'>
				<span></span>
				<div id='language_from' class='dropdown' event='Language From'></div>
			</div>
		</div>
	</div>
	<div id='main-translation'>asd</div>
	<div id='main-container' class='field'>
		
		<div id='main' class='relative'>

<!-- 		<div class="cssload-container">
			<div class="cssload-speeding-wheel"></div>
		</div> -->
			<!-- <div>
				<h1>Wyglad:</h1>
				<ul>
					<li>Przegladanie tekstow:
						<ul>
							<li>wszystkich</li>
							<li>przeczytanych</li>
							<li>w danym jezyku</li>
							<li>nie dluzszy niz X znakow</li>
							<li>z podanej kategorii</li> // hashtagi?
						</ul>
					</li>
				</ul>
				<p>Zawezanie poszukiwan</p>
				<ul>
					<li>Przegladanie zdan:
						<ul>
							<li>zawierajacych podane wyrazy/frazy</li>
							<li>w danym jezyku</li>
						</ul>
					</li>
					<li>Przegladanie fraz:
						<ul>
							<li>zawierajacych podane wyrazy</li>
							<li>w podanym jezyku</li>
						</ul>
					</li>
					<li>Przegladanie wyrazow:
						<ul>
							<li>zawierajacych podany ciag znakow</li>
							<li>w podanym jezyku</li>
						</ul>
					</li>
				</ul>
				<p>Find translation</p>
				<p>radiobox: word/phrase/sentence</p>
				<p>Find word: - simple</p>
				<p>Find phrase: - simple</p>
				<p>Find sentence: - simple</p>
			</div> -->
		</div>
	</div>	
	<div id='menu-container' class='field'>
		<div id='menu' class='menu'>
			<p class='menuitem' event='Read Text'>Read text</p>
			<p class='menuitem' event='Words'>Words</p>
			<p class='menuitem' event='Phrases'>Phrases</p>
			<p class='menuitem' event='Sentences'>Sentences</p>
			<hr>
			<p class='menuitem' event='Settings'>Settings</p>
			<p class='menuitem' event='Help'>Help</p>
			<p class='menuitem' event='Logout'>Logout</p>
		</div>
	</div>
	<div id='right-1-container' class='field'>
		<div id='translation-container' class='.relative'>
			<div>
				<h3>Add translation</h3>
				<div><input id='translation_add_from' placeholder='From' autocomplete='off'></div>
				<div><input id='translation_add_to' placeholder='To' autocomplete='off'></div>
			</div>
			<div>
				<h3>Find translation</h3>
				<input id='translation_find' placeholder='What are you looking for?' autocomplete='off'>
				<div id='translation_found'>
					<x></x>
				</div>
			</div>
		</div>
	</div>
	<div id='sky-container'  class='hidden'>
		<div id='fog'></div>
		<div id='sky' class='.relative'></div>
		<div id='sky-confirm-container' class='hidden'></div>
	</div>
</body>

</html>

