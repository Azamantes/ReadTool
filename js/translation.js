(function TRANSLATION(){
	'use strict';

	var Place = {};
	var lastTry;
	var chilling = true;

	var self = new MainModule;
	self.listen('init', init);
	self.listen('translation: from', catchThat);
	self.listen('translation: Chill Out', chillOut);
	self.listen('websocket: Translation Found', found);
	self.listen('websocket: Translation Added', clearAddTranslation);
	
	function init(){
		Place.from = document.get('translation_add_from');
		Place.to = document.get('translation_add_to');
		Place.find = document.get('translation_find');
		Place.found = document.get('translation_found');
		self.watch('translation_add_to', 'keydown', readySteady); // send translation via websocket
		self.watch('translation_find', 'keydown', findTranslation);
	}
	function chillOut(){
		chilling = true;
	}
	function catchThat(string){
		if(!!string){
			Place.from.value = string;
			Place.to.focus();
			chilling = false;
		}
	}
	function findTranslation(event){
		if(event.keyCode !== 13 || this.value === lastTry){
			return; // nothind to do.
		}
		lastTry = this.value;
		websocket.sendJSON({
			event: 'getTranslation',
			from: this.value,
			find: true
		});
	}
	function readySteady(event){
		if(event.keyCode !== 13){
			return; //not enter or not focused
		}
		let from = Place.from.value;
		let to = this.value;
		if(!from || !to){
			return;
		}
		websocket.sendJSON({
			event: 'addTranslation',
			from: from,
			to: to
		});
	}
	function clearAddTranslation(){
		if(chilling) Place.from.value = '';
		Place.to.value = '';
	}
	function found(data){
		var list = document.createElement('UL');
		var listElement = document.createElement('li');
		var box;
		data.translation.map(item => {
			box = listElement.cloneNode(true);
			box.textContent = item;
			list.appendChild(box);
		});
		Place.found.replaceChild(list, Place.found.firstChild);
	}
})();