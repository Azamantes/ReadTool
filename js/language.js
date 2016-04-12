(function(){
	'use strict';

	var from = null;
	var to = null;

	var self = new MainModule;
	self.listen('init', init);
	self.listen('mouseclick: Language From', language_from);
	self.listen('mouseclick: Language To', language_to);
	self.listen('websocket: Language From', setFrom);
	self.listen('websocket: Language To', setTo);
	
	function init(){
		from = document.get('language_from').parentNode.childNodes[0];
		to = document.get('language_to').parentNode.childNodes[0];

		from.innerHTML = '';
		from.textContent = 'From';
		to.innerHTML = '';
		to.textContent = 'To';
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
	function setFrom(data){
		from.textContent = 'From: [' + data.data + ']'
	}
	function setTo(data){
		to.textContent = 'To: [' + data.data + ']'
	}
})();