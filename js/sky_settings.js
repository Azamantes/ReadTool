(function SKY_SETTINGS(){
	'use strict';

	var self = new SkyModule({ route: '/settings', view, destructor });
	self.listen('mouseclick: Settings', show);
	self.listen('websocket: Password Incorrect', incorrectPassword);
	self.listen('websocket: Password Changed', changedPassword);
	self.set('view: confirmation', [
		m('p', { id: 'sky-confirm' }),
		m('button', { onclick: (event) => {
			event.preventDefault();
			self.popup.hide();
			self.get('password: input').value = '';
		} }, 'Ok')
	]);

	function show(){
		self.show();
		setReferences();
		addListeners();
		self.deity.watchMe(self);
	}
	function setReferences(){
		self.set('password: input', document.get('settings-password'));
		self.set('password: button', document.get('settings-password-button'));
		self.set('popup', document.get('sky-confirm-container'));
	}
	function addListeners(){
		self.get('password: button').addEventListener('click', setPassword);
	}
	function destructor(){
		self.set('password: input', null);
		self.set('password: button', null);
	}
	function view(){
		return [
			m('div', { class: 'sky-title' }, m('h1', 'Settings')),
			m('div', { id: 'settings_sky', class: 'sky-main' }, [
				m('div', { id: 'settings-password-container', class: 'form-body' }, [
					m('div', { className: 'form-body-left' }, [
						m('span', 'New password')
					]),
					m('div', { className: 'form-body-right' }, [
						m('input', { id: 'settings-password', type: 'password' }),
						m('button', { id: 'settings-password-button', type: 'click' }, 'Set password')
					])
				])
			])
		]
	}
	function setPassword(){
		websocket.sendJSON({
			event: 'changePassword',
			password: self.get('password: input').value
		});
	}
	function incorrectPassword(){
		self.popup.render(self.get('view: confirmation'), '<r>Given password is incorrect.</r>');
	}
	function changedPassword(){
		self.popup.render(self.get('view: confirmation'), '<g>Password changed.</g>');
	}
})();