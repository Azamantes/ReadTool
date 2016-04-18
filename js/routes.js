(function SKY_ROUTES(){
	var ROUTES = {};

	var self = new SkyModule;
	self.listen('add route', addRoute);
	self.listen('init routes', init);
	self.component.view = function(){
		return m('div');
	};
	
	function init(){
		addRoute({ route: '/', component: self.component });
		m.route(document.get('sky'), '/', ROUTES);
	}
	function addRoute(data){
		ROUTES[data.route] = data.component;
	}
})();