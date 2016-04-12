(function(){
	var ROUTES = {};

	var module = new NinjaModule;
	module.listen('add route', addRoute);
	module.listen('init routes', init);
	module.component.view = function(){
		return m('div');
	};
	function init(){
		addRoute({ route: '/', component: module.component });
		m.route(document.get('sky'), '/', ROUTES);
	}
	function addRoute(data){
		ROUTES[data.route] = data.component;
	}
})();