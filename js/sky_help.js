(function SKY_HELP(){
	'use strict';

	var self = new SkyModule({ route: '/help', view }); //true -> self.addRoute on init
	self.listen('mouseclick: Help', show);

	function show(){
		self.show();
		self.deity.watchMe(self);
	}
	function view(){
		return m('div', { id: 'help_sky' }, [
			m('h3', 'TOPBAR'),
			m('p', { innerHTML: '<b>Settings</b> :: various account settings' }),
			m('p', { innerHTML: '<b>From</b> :: the language you learn (affects browsed texts)' }),
			m('p', { innerHTML: '<b>To</b> :: a language you know (affects translations)' }),
			m('h3', 'LEFT'),
			m('p', { innerHTML: '<i>inactive (for now)</i>' }),
			m('h3', 'RIGHT'),
			m('p', { innerHTML: '<b>Add translation</b>' }),
			m('ul', [
				m('li', { innerHTML: 'From :: a word to translate' }),
				m('li', { innerHTML: 'To :: your translation of the word' })
			]),
			m('h3', 'CENTER'),
			m('span', 'This is your dojo.' )
		])
	};	
})();