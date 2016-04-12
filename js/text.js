(function(){
	'use strict';
	
	var Words = new Map;
	var Text = new Map; // overwriting native Text function
	var allowedTags = new Set(['x', 'y']);
	var DirtyClean; // Map
	var CleanIndexes; // Map
	var Cache; // []
	var REGEXP = /[0-9\/»«\:;'"„“”\[\]\{\}~<>\|\!@#\$%\^&\*\)\(\+\=\.,_—–\-\?×]/g;
	var FloatingTranslation = null;
	var currentTranslation = []; // current translation for FloatingTranslation
	var lastWord;

	var Position = {
		x: undefined,
		y: undefined
	};

	var self = new MainModule;
	self.main = null;
	self.listen('init', init);
	self.listen('mouseclick: menu: Text', render);
	self.listen('websocket: pulledText', parseText);
	self.listen('websocket: language: Words', gotMyWords);
	self.listen('websocket: Translation Got', gotTranslation);
	self.listen('websocket: Translation Added', addTranslation);
	self.listen('mouseclick::', click);
	self.listen('mousedown: main', mousedown);
	self.listen('mouseover: main', mouseover);
	
	function init(){
		FloatingTranslation = document.get('main-translation');
	}
	function parseText(data){
		var box, i = 0;
		Cache = [];
		DirtyClean = new Map;
		CleanIndexes = new Map;

		var tag;
		Text.set('language', data.language);
		var LANGUAGE_WORDS = Words.get(data.language);
		data.content.replace(/\n/g, ' <br> ').replace(/ +/g, ' ').split(' ').map(word => {
			box = word.toLowerCase().replace(REGEXP, '');
			DirtyClean.set(word, box);
			if(!CleanIndexes.has(box)){
				CleanIndexes.set(box, []);
			}
			CleanIndexes.get(box).push(i);
			if(word === '<br>') Cache.push(word);
			else {
				tag = LANGUAGE_WORDS.has(box)? 'y' : 'x';
				Cache.push('<' + tag + '>' + word + '</' + tag + '>');
			}
			++i;
		});
		
		Text.set('title', data.title);
		Text.set('source', data.source);
		render();
		self.deity.closeModule();

		Text.set('number: all', data.words);
		Text.set('number: unique', data.words_unique);
		Text.set('words: all', Cache);
		Text.set('words: unique', new Set(data.content_clean.split(' ')));
	}
	function render(){
		var max = Cache.length,
			i = -1,
			string = '';
		while(++i < max){
			string += Cache[i] + ' ';
		}
		var title = '<div id="text_reading_title"><h1>' + Text.get('title') + '</h1></div>',
			content = '<div id="text_reading_content">' + string + '</div>',
			source = '<div id="text_reading_source">Source: <a>' + Text.get('source') + '</a></div>';
		self.place.innerHTML = title + content + source;
	}
	var regexp_X = new RegExp('x>', 'g');
	var regexp_Y = new RegExp('y>', 'g');
	function click(event){
		var target = event.target;
		var tag = target.tagName.toLowerCase();
		if(!allowedTags.has(tag)){
			return;
		}
		var text = target.textContent.toLowerCase().replace(REGEXP, '');
		if(text === ''){
			return;
		}
		text = DirtyClean.get(target.textContent);
		var regexp = tag === 'x'? regexp_X : regexp_Y;
		var to = (tag === 'x'? 'y' : 'x') + '>';
		var tab = CleanIndexes.get(text);
		var l = tab.length;
		var i = -1;
		var id;
		while(++i < l){
			id = tab[i];
			Cache[id] = Cache[id].replace(regexp, to);
		}
		render();
		setTimeout(function(){
			Words.get(Text.get('language'))[tag === 'x'? 'add' : 'delete'](text);
			websocket.sendJSON({
				event: 'wordState',
				state: tag === 'X',
				word: text
			});
		}, 0);
		
	}
	function mousedown(event){
		event.preventDefault();
	}
	function mouseover(event){
		var tag = event.target.tagName;
		Position.x = event.clientX;
		Position.y = event.clientY;
		if(tag !== 'Y'){
			self.deity.shout('css', ['main-css', {
				'#main-translation': {
					right: '-300px',
					bottom: '-300px'
				}
			}]);
			FloatingTranslation.innerHTML = '';
			self.deity.shout('translation: Chill Out');
			return;
		}
		var clean = event.target.textContent.toLowerCase().replace(REGEXP, '');
		self.deity.shout('translation: from', clean); // for translation
		if(clean === lastWord){
			lastWord = clean;
			showTranslation();
		} else {
			websocket.sendJSON({
				event: 'getTranslation',
				from: clean
			});
		}
	}
	function addTranslation(data){
		if(currentTranslation.length < 5){
			currentTranslation.push(data.translation);
		}
		putTranslation();
	}
	function gotTranslation(data){
		currentTranslation = data.translation;
		putTranslation();
		showTranslation();
	}
	function putTranslation(){
		FloatingTranslation.innerHTML = currentTranslation.length? '<p>' + currentTranslation.join('</p><p>') + '</p>' : '<p>...</p>';
	}
	function showTranslation(x, y){
		self.deity.shout('css', ['main-css', {
			'#main-translation': {
				'animation': 'main-translation 1s',
				'animation-fill-mode': 'forwards',
				'bottom': ((screen.height - screen.availTop) - Position.y - 35) + 'px',
				'right': ((screen.width - screen.availLeft) - Position.x - 25) + 'px'
			}
		}]);
	}
	function gotMyWords(data){
		Words.set(data.language, new Set(data.words));
	}
})();