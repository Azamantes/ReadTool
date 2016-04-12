Watchdog.watch(window, 'load', function(){
	NinjaModule.prototype.place = document.get('sky-container');
	MainModule.prototype.place = document.get('main');

	Watchdog.init();
	Watchdog.shout('init routes');

	
	// CSS.setSimple('!main-translation', {
	// 	'@keyframes main-translation': {
	// 		'0%': {
	// 			left: '-300px'
	// 		},
	// 		'70%': {
	// 			left: '800px'
	// 		},
	// 		'100%': {
	// 			left: '800px'
	// 		}
	// 	}
	// });


	// @keyframes main-translation {
	// 	0% {
	// 		left: -300px;
	// 	}
	// 	70% { left: 800px; }
	// 	100% { left: 800px; }
	// }


	Watchdog.watch(window, 'keydown', function(event){
		Watchdog.shout('keyboard: keydown', event);
		if(!Watchdog.request('keyboardFree')){
			return;
		}
		switch(event.keyCode){
			case 27: Watchdog.closeModule(); break; //ESC
			default:
			// console.log('default:');
				Watchdog.shout('keydown: ' + event.keyCode);
				// Watchdog.shout('keydown: ' + String.fromCharCode(event.keyCode));
		}
	});
	Watchdog.watch(window, 'keyup', function(event){
		Watchdog.shout('keyboard: keyup', event);
	});
	Watchdog.watch(window, 'click', function(event){
		Watchdog.shout('mouseclick::', event); // more vague, not especially the "main", but it's ok
	});
	Watchdog.watch('main', 'mousedown', function(event){
		Watchdog.shout('mousedown: main', event);
	});
	Watchdog.watch('main', 'mouseover', function(event){
		Watchdog.shout('mouseover: main', event);
	});
	Watchdog.watch('left-1-menu', 'click', function(event){
		Watchdog.shout('mouseclick: menu: ' + event.target.textContent);
	});
	// ------------
	// Top bar
	// ------------
	Watchdog.watch('topbar', 'click', function(event){
		Watchdog.shout('mouseclick: ' + (event.target.getAttribute('event') || event.target.parentNode.getAttribute('event')), event);
	});
});

// setInterval(function(){
// console.log(Watchdog.request('keyboardFree'))
// }, 1000)

// setTimeout(function(){
// 	websocket.sendJSON({
// 		event: 'pullText',
// 		id: 7
// 	});
	
// }, 500);



Watchdog.watch(window, 'beforeunload', function(){
	websocket.sendJSON({ event: 'disconnect' });
	websocket.close();
});