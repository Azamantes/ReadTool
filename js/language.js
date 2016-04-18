(function LANGUAGE(){
	'use strict';

	var self = new MainModule;
	self.listen('init', init);
	self.listen('mouseclick: Language From', language_from);
	self.listen('mouseclick: Language To', language_to);
	self.listen('websocket: Language From', (data) => {
		self.get('from').textContent = 'From: [' + data.data + ']';
	});
	self.listen('websocket: Language To', (data) => {
		self.get('to').textContent = 'To: [' + data.data + ']';
	});
	
	function init(){
		self.set('from', document.get('language_from').parentNode.childNodes[0]);
		self.get('from').textContent = 'From';
		self.get('from').innerHTML = '';
		self.set('to', document.get('language_to').parentNode.childNodes[0]);
		self.get('to').textContent = 'To';
		self.get('to').innerHTML = '';
	}
	function language_from(event){
		if(event.target.tagName !== 'P'){
			return;
		}
		websocket.sendJSON({
			event: 'changeLanguageFrom',
			data: event.target.textContent
		});
	}
	function language_to(event){
		if(event.target.tagName !== 'P'){
			return;
		}
		websocket.sendJSON({
			event: 'changeLanguageTo',
			data: event.target.textContent
		});
	}
})();