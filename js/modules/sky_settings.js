	(function SKY_SETTINGS(){
		const self = new SkyModule({ route: '/settings', view, construct });
		self.listen('menu: Settings', show);
		self.listen('websocket: Password Incorrect', incorrectPassword);
		self.listen('websocket: Password Changed', changedPassword);
		self.listen('websocket: Color Set', setColorInit);
		self.listen('websocket: Color Not Set', () => { console.log('Failed to set'); });

		self.set('view: confirmation', [
			m('p', { id: 'sky-confirm' }),
			m('button', { onclick: (event) => {
				event.preventDefault();
				self.popup.hide();
				self.get('password: input').value = '';
			} }, 'Ok')
		]);
		self.set('color: cache', '');
		
		self.references.push({ key: 'password: input', value: 'settings-password' }); //set each time the module is shown
		self.references.push({ key: 'password: button', value: 'settings-password-button' });
		self.references.push({ key: 'color1: input', value: 'settings-highlight-color1' });
		self.references.push({ key: 'color1: button', value: 'settings-highlight-color1-button' });
		self.references.push({ key: 'color2: input', value: 'settings-highlight-color2' });
		self.references.push({ key: 'color2: button', value: 'settings-highlight-color2-button' });
		self.references.push({ key: 'popup', value: 'sky-confirm-container', const: true });
		self.eventListeners.push({ element: 'password: button', event: 'click', callback: setPassword }); //set each time the module is shown
		// self.eventListeners.push({ element: 'color: input', event: 'change', callback: setColorCache });
		self.eventListeners.push({ element: 'color1: button', event: 'click', callback: setColor1 });
		self.eventListeners.push({ element: 'color2: button', event: 'click', callback: setColor2 });
		
		function construct(){
			jscolor.bind();
			putColor();
		}
		function show(){
			self.show();
			self.deity.watchMe(self);
		}
		function view(){
			return [
				m('div', { class: 'sky-title' }, m('h1', 'Settings')),
				m('div', { id: 'settings_sky', class: 'sky-main' }, [
					m('div', { id: 'settings-password-container' }, [
						m('div', { class: 'form-body' }, [
							m('div', { className: 'form-body-left' }, [
								m('span', 'New password')
							]),
							m('div', { className: 'form-body-right' }, [
								m('input', { id: 'settings-password', type: 'password' }),
								m('button', { id: 'settings-password-button', type: 'click' }, 'Set password'),
							])		
						]),
						m('div', { class: 'form-body' }, [
							m('div', { className: 'form-body-left' }, [
								m('span', 'Highlight #1')
							]),
							m('div', { className: 'form-body-right' }, [
								m('input', { id: 'settings-highlight-color1', class: 'color', value: '' }),
								m('button', { id: 'settings-highlight-color1-button', type: 'click' }, 'Set color')
							])
						]),
						m('div', { class: 'form-body' }, [
							m('div', { className: 'form-body-left' }, [
								m('span', 'Highlight #2')
							]),
							m('div', { className: 'form-body-right' }, [
								m('input', { id: 'settings-highlight-color2', class: 'color', value: '' }),
								m('button', { id: 'settings-highlight-color2-button', type: 'click' }, 'Set color')
							])
						])
					])
				])
			];
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
		function putColor(){
			const input1 = self.get('color1: input');
			const input2 = self.get('color2: input');
			const cache1 = self.get('color1: cache');
			const cache2 = self.get('color2: cache');
			input1.value = cache1;
			input2.value = cache2;
			input1.style.background = '#' + cache1;
			input2.style.background = '#' + cache2;
		}
		function setColorInit(data){
			const color = data.color;
			const number = parseInt(data.number);
			const name = 'color' + number;
			const css = number === 1? 'y' : 'y:hover';
			self.set(name + ': cache', data.color);
			document.get(`main-transation-${css}`).textContent = `${css}{background:#${color};}`;
		}
		function setColor1(){
			websocket.sendJSON({ event: 'setColor', color: self.get('color1: input').value, number: 1 });
		}
		function setColor2(){
			websocket.sendJSON({ event: 'setColor', color: self.get('color2: input').value, number: 2 });
		}
	})();
	