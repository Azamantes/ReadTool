(function CSS_MANAGEMENT(){
	'use strict';

	const CSS = new CSSClass(['reading', 'main-css']); //overwriting native function CSS inside the browser

	var self = new MainModule;
	self.listen('init', init);
	self.listen('css', changeCSS);

	function init(){
		CSS.set('reading', {
			y: {
				'background': 'cornflowerblue',
				'border-radius': '5px'
			},
			'y:hover': {
				'background': 'lightgreen'
			}
		});
	}
	function changeCSS(array){
		CSS.set(array[0], array[1]);
	}
})();