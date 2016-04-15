(function(){
	'use strict';
	var self = new NinjaModule(true); //true -> self.addRoute on init
	self.listen('mouseclick: Help', show);
	self.component.view = view;
	self.route = '/help';

	function show(){
		self.show();
		self.deity.watchMe(self);
	}

	function view(){
		return m('div', { id: 'help_sky' }, [
			m('h3', 'Topbar:'),
			m('p', { innerHTML: '<i>Settings :: inactive</i>' }),
			m('p', { innerHTML: '<b>From</b> :: the language you learn (affects browsed texts)' }),
			m('p', { innerHTML: '<b>To</b> :: a language you know (affects translations)' }),
			m('h3', 'Left:'),
			m('p', { innerHTML: '<i>inactive (for now)</i>' }),
			m('h3', 'Right'),
			m('p', { innerHTML: '<b>Add translation</b> ::' }),
			m('ul', [
				m('li', { innerHTML: 'From :: a word to translate' }),
				m('li', { innerHTML: 'To :: your translation of the word' })
			]),
			m('h3', 'Center:'),
			m('span', 'This is your dojo.' )
		])
	};	
})();