(function KEYBOARD(){
	'use strict';

	var forbiddenClicks = new Set(['INPUT', 'TEXTAREA']);
	var forbiddenKeys = new Set([9]);
	var keyboardFree = true;
	
	var self = new SkyModule;
	self.listen('mouseclick::', checkMouse);
	self.listen('keyboard: keydown', checkKeyboard);
	self.listen('keyboard: keyup', checkKeyboard);
	self.register('keyboardFree', returnKeyboardFree);
	
	function checkMouse(event){
		keyboardFree = !forbiddenClicks.has(event.target.tagName);
	}
	function checkKeyboard(event){
		if(!keyboardFree) return;
		keyboardFree = !(forbiddenKeys.has(event.keyCode) && forbiddenClicks.has(event.target.tagName));
	}
	function returnKeyboardFree(){
		return keyboardFree;
	}
})();