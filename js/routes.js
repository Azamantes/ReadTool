	(function SKY_ROUTES(){
		const self = new SkyModule({ route: '/', view });
		self.listen('add route', addRoute);
		self.listen('init routes', init);
		self.set('routes', {});
		
		function init(){
			m.route(document.get('sky'), '/', self.get('routes'));
		}
		function addRoute(data){
			self.get('routes')[data.route] = data.component;
		}
		function view(){
			return m('div');
		}
	})();
	