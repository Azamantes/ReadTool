(function(){
	'use strict';

	const CSS = new CSSClass(['reading', 'main-css']); //overwriting native function CSS inside the browser

	var self = new MainModule;
	self.listen('init', init);
	self.listen('css: .go', go);
	self.listen('css', changeCSS);

	function init(){
		console.log('bedzie ustawione...');
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
	function go(){

	}
	function changeCSS(array){
		CSS.set(array[0], array[1]);
	}
})();