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
			

			websocket.onopen = function(){
				console.log('Websocket connection is open.');
				websocket.sendJSON({
					event: 'connect',
					userID: USER_ID,
				});
			};
			websocket.onmessage = function(data){
				data = JSON.parse(data.data);
				if(data.event === 'bye'){
					websocket.close();
					return;
				}
				Watchdog.shout('websocket: ' + data.event, data);
			};

			let element = document.createElement('style');
			element.id = 'main-css';
			document.head.appendChild(element);
			element = document.createElement('style');
			element.id = 'main-transation-y';
			document.head.appendChild(element);
			element = document.createElement('style');
			element.id = 'main-transation-y:hover';
			document.head.appendChild(element);
			

			Watchdog.init();
			Watchdog.shout('init routes');
			Watchdog.watch(window, 'keydown', function(event){
				Watchdog.shout('keyboard: keydown', event);
				if(!Watchdog.request('keyboardFree')){
					return;
				}
				switch(event.keyCode){
					case 27: {
						Watchdog.closeModule(); 
						break;
					} //ESC
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
			Watchdog.watch('main', 'mouseover', function(event){
				Watchdog.shout('mouseover: main', event); // more vague, not especially the "main", but it's ok
			});
			// Watchdog.add({ element: 'main', event: 'mousedown', callback: null });
			// Watchdog.add({ element: 'main', event: 'mousemove', callback: null });
			Watchdog.watch('main', 'mousedown', function(event){
				event.preventDefault();
				// Watchdog.shout('menu: ' + event.target.getAttribute('event'));
			});
			Watchdog.watch('menu', 'click', function(event){
				Watchdog.shout('menu: ' + event.target.getAttribute('event'));
			});
			// ------------
			// Top bar
			// ------------
			Watchdog.watch('topbar', 'click', function(event){
				Watchdog.shout('mouseclick: ' + (event.target.getAttribute('event') || event.target.parentNode.getAttribute('event')), event);
			});
			Watchdog.startWatching();
		});
	})();
	