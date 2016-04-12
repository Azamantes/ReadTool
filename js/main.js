const Watchdog = new Watchdogs;

NinjaModule.prototype.deity = Watchdog;
MainModule.prototype.deity = Watchdog;

Watchdog.listen('websocket: languages', function(data){
	var array = data.data;
	Watchdog.register('languages', () => array);
	var fragment = document.createDocumentFragment();
	var box;
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