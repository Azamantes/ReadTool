<?php
	session_start();

	if(!isset($_SESSION['user'])){
		header('Location: login.php');
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'>
	<link rel='stylesheet' href='css/keyframes.css' type='text/css'>
	<link rel='stylesheet' href='css/sky.css' type='text/css'>
	<link rel='stylesheet' href='css/tags.css' type='text/css'>
	<link rel='stylesheet' href='css/ids.css' type='text/css'>
	<link rel='stylesheet' href='css/classes.css' type='text/css'>
	<link rel='stylesheet' href='css/forms.css' type='text/css'>
	<link rel='stylesheet' href='css/main.css' type='text/css'>
	<!-- <link rel='stylesheet' href='css/ported.css' type='text/css'> -->
	
	<?php
		if(isset($_SESSION['user'])){
			echo "<script>const USER_ID = parseInt(" . $_SESSION['user'] . ");</script>";
		}
	?>

	<script src='/Libraries/jscolor/jscolor.js'></script>
	<script src='/Libraries/Mithril/mithril.min.js'></script>
	<script src='js/extensions.js'></script>
	<script src='js/classes.js'></script>
	<script src='js/main.js'></script>
	<script src='js/css.js'></script>
	<script src='js/routes.js'></script>
	<script src='js/websocket.js'></script>
	<script src='js/watchdogs.js'></script>
	<script src='js/keyboard.js'></script>
	<script src='js/language.js'></script>
	<script src='js/text.js'></script>
	<script src='js/translation.js'></script>
	<script src='js/sky_help.js'></script>
	<script src='js/sky_logout.js'></script>
	<script src='js/sky_text_browser.js'></script>
	<script src='js/sky_text_add.js'></script>

<style>
/*	.cssload-container {
		width: 100%;
		height: 47px;
		text-align: center;
	}

	.cssload-speeding-wheel {
		width: 47px;
		height: 47px;
		margin: 0 auto;
		border: 3px solid rgb(0,0,0);
		border-radius: 50%;
		border-left-color: transparent;
		border-right-color: transparent;
		animation: cssload-spin 475ms infinite linear;
	}

	@keyframes cssload-spin {
		100%{ transform: rotate(360deg); transform: rotate(360deg); }
	}*/
</style>

</head>
<body>
	<div id='topbar-container' class='field'>
		<div id='topbar' class='relative'>
			<div id='settings'>
				<span>Settings</span>
				<!-- <input id='color' class='color' style='cursor:context-menu' > -->
			</div>
			<div id='logout' event='Logout'>Logout</div>
			<div id='help' event='Help'>Help</div>
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
	<div id='main-translation'></div>
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
							<li>z podanej kategorii</li>
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
	<div id='left-1-container' class='field'>
		<!-- <h2>MENU</h2> -->
		<div id='left-1-menu' class='menu'>
			<p class='menuitem'>Texts</p>
			<p class='menuitem'>Words</p>
			<p class='menuitem'>Phrases</p>
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
		<div id='sky' class='.relative'>
			<div>
				<b>Keyboard navigation:</b><br><br>
				1 - browse texts to read<br>
				2 - add new texts<br>
				3 - browse unchecked (yet) texts (Language Supervisors only)<br>
				4 - correct and approve unchecked texts (Language Supervisors only)<br>
				R - reload text<br>
				Esc - hide all layers
				<hr>
				<b>When reading a text:</b><br><br>
				Add word translation - E + click on a word<br>
				Add phrase translation - select text + S<br>
				Get phrase translation - select text + F<br>
				Get word translation - click on a word <br>
			</div>
		</div>
	</div>
</body>

</html>

