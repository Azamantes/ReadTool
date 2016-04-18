(function KEYBOARD(){
	'use strict';

	var self = new SkyModule;
	self.listen('mouseclick::', checkMouse);
	self.listen('keyboard: keydown', checkKeyboard);
	self.listen('keyboard: keyup', checkKeyboard);
	self.register('keyboardFree', () => self.get('keyboardFree'));
	self.set('forbidden: clicks', new Set(['INPUT', 'TEXTAREA']));
	self.set('forbidden: keys', new Set([9]));
	self.set('keyboardFree', true);
	
	function checkMouse(event){
		var logic = self.get('forbidden: clicks').has(event.target.tagName);
		self.set('keyboardFree', !logic);
	}
	function checkKeyboard(event){
		if(!self.get('keyboardFree')) return;
		var logic = self.get('forbidden: keys').has(event.keyCode) && self.get('forbidden: clicks').has(event.target.tagName);
		self.set('keyboardFree', !logic);
	}
})();