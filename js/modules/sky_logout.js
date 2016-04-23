	(function SKY_LOGOUT(){
		const self = new SkyModule({ route: '/logout', view });
		self.listen('menu: Logout', show);

		function show(){
			self.show();
			self.deity.watchMe(self);
		}
		function view(){
			const FORM = {
				head: m('div', { class: 'form-head' }),
				body: m('div', { class: 'form-body' }),
				bottom: m('div', { class: 'form-bottom' })
			};
			FORM.head.children.push(
				m('h2', 'Logout'),
				m('div', 'Press Continue to continue.')
			);
			FORM.bottom.children.push(
				m('button', { onclick: logout }, 'Continue'),
				m('button', { onclick: back }, 'Back')
			);
			return m('div', { id: 'logout_sky', className: 'form' }, [
				m('form', [ FORM.head, FORM.bottom ])
			]);
		}
		function logout(event){
			event.preventDefault();
			window.location.href = 'logout.php';
		}
		function back(event){
			event.preventDefault();
			self.close();
		}
	})();
	