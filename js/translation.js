(function TRANSLATION(){
	'use strict';

	var self = new MainModule;
	self.listen('init', init);
	self.listen('translation: from', catchThat);
	self.listen('translation: Chill Out', () => self.set('chilling', true));
	self.listen('websocket: Translation Found', found);
	self.listen('websocket: Translation Added', clearAddTranslation);
	self.set('chilling', true);
	// self.set('lastTry', null);
	self.set('place: from', null);
	self.set('place: to', null);
	self.set('place: found', null);

	function init(){
		self.set('place: from', document.get('translation_add_from'));
		self.set('place: to', document.get('translation_add_to'));
		self.set('place: found', document.get('translation_found'));
		self.watch('translation_add_to', 'keydown', readySteady); // send translation via websocket
		self.watch('translation_find', 'keydown', findTranslation);
	}
	function catchThat(string){
		if(!string) return;
		self.get('place: from').value = string;
		self.get('place: to').focus();
		self.set('chilling', false);
	}
	function findTranslation(event){
		if(event.keyCode !== 13 || this.value ===  self.get('lastTry')){
			return; // nothind to do.
		}
		self.set('lastTry', this.value);
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
		let from = self.get('place: from').value,
			to = this.value;
		if(!from || !to){
			return;
		}
		websocket.sendJSON({ event: 'addTranslation', from, to });
	}
	function clearAddTranslation(){
		if(self.get('chilling')){
			self.get('place: from').value = '';
		}
		self.get('place: to').value = '';
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
		self.get('place: found').replaceChild(list, self.get('place: found').firstChild);
	}
})();