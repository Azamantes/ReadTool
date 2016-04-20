(function WATCHDOG_STUFF(){
	Watchdog.watch(window, 'beforeunload', function(){
		websocket.sendJSON({ event: 'disconnect' });
		websocket.close();
	});
	Watchdog.watch(window, 'load', function(){
		MainModule.prototype.place = document.get('main');
		SkyModule.prototype.place = document.get('sky-container');
		MainModule.prototype.popup.place = document.get('sky-confirm-container');
		SkyModule.prototype.popup.place = document.get('sky-confirm-container');
		

		Watchdog.init();
		Watchdog.shout('init routes');
		Watchdog.watch(window, 'keydown', function(event){
			Watchdog.shout('keyboard: keydown', event);
			if(!Watchdog.request('keyboardFree')){
				return;
			}
			switch(event.keyCode){
				case 27: Watchdog.closeModule(); break; //ESC
				default:
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
		Watchdog.watch('menu', 'click', function(event){
			console.log('menu: ' + event.target.getAttribute('event'));
			Watchdog.shout('menu: ' + event.target.getAttribute('event'));
		});
		// ------------
		// Top bar
		// ------------
		Watchdog.watch('topbar', 'click', function(event){
			Watchdog.shout('mouseclick: ' + (event.target.getAttribute('event') || event.target.parentNode.getAttribute('event')), event);
		});
	});
	Watchdog.listen('websocket: languages', function(data){
		var array = data.data,
			fragment = document.createDocumentFragment(),
			box;
		Watchdog.register('languages', () => array);
		array.map(language => {
			box = document.createElement('p');
			box.class = language.id;
			box.short = language.shorthand;
			box.textContent = language.name;
			fragment.appendChild(box);
		});
		document.get('language_from').appendChild(fragment.cloneNode(true));
		document.get('language_to').appendChild(fragment.cloneNode(true));
	});
})();