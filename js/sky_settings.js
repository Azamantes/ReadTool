/*
 * Szkielet
*/
// return {
	// 	head: m('div', { class: 'form-head' }),
	// 	body: m('div', { class: 'form-body' }),
	// 	bottom: m('div', { class: 'form-bottom' })
	// }
// }

(function SKY_SETTINGS(){
	'use strict';

	const COMPILED_VIEW = view();

	const Place = {
		password: {
			input: null,
			button: null
		},
		popup: null
	};
	const popup = {
		show: showPopup,
		hide: hidePopup,
		render: renderPopup
	};

	var Views = new Map;
	Views.set('confirmation', [
		m('p', { id: 'sky-confirm' }),
		m('button', { onclick: (event) => {
			event.preventDefault();
			popup.hide();
		} }, 'Ok')
	]);

	var self = new NinjaModule(true); //true -> self.addRoute on init
	self.listen('mouseclick: Settings', show);
	self.listen('websocket: Password Incorrect', incorrectPassword);
	self.listen('websocket: Password Changed', changedPassword);
	self.component.view = () => COMPILED_VIEW;
	self.route = '/settings';
	self.destructor = destructor;

	function show(){
		self.show();
		setReferences();
		addListeners();
		self.deity.watchMe(self);
	}
	function setReferences(){
		Place.password.input = document.get('settings-password');
		Place.password.button = document.get('settings-password-button');
		Place.popup = document.get('sky-confirm-container');
	}
	function addListeners(){
		Place.password.button.addEventListener('click', setPassword);
	}
	function destructor(){
		Place.password.input = null;
		Place.password.button = null;
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
		var password = Place.password.input.value;
		if(password === ''){
			incorrectPassword();
		}
		websocket.sendJSON({
			event: 'changePassword',
			password: password
		});
	}
	function renderPopup(value, text){
		m.render(document.get('sky-confirm-container'), Views.get(value));
		if(text) document.get('sky-confirm').innerHTML = text;
	}
	function incorrectPassword(){
		popup.render('confirmation', '<r>Given password is incorrect.</r>');
		popup.show();
	}
	function changedPassword(){
		popup.render('confirmation', '<g>Password changed.</g>');
		popup.show();
	}
	function showPopup(){
		Place.popup.className = 'appear';
	}
	function hidePopup(){
		Place.popup.className = 'disappear';
	}
})();