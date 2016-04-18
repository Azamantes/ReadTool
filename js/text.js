(function TEXT(){
	'use strict';
	
	// I'll leave normal variables here.

	var Words = new Map;
	var Text = new Map; // overwriting native Text function
	var allowedTags = new Set(['x', 'y']);
	var CleanIndexesDOM;
	var CleanDOMReferences; // Map :: maps
	var Cache; // []
	var REGEXP;
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
	self.listen('keydown: 49', hideTranslation);
	self.listen('keydown: 50', hideTranslation);
	self.listen('mouseclick: menu: Text', render);
	self.listen('websocket: pulledText', parseText);
	self.listen('websocket: language: Words', gotMyWords);
	self.listen('websocket: Translation Got', gotTranslation);
	self.listen('websocket: Translation Added', addTranslation);
	self.listen('websocket: RegExp', setRegExp);
	self.listen('mouseclick::', click);
	self.listen('mousedown: main', mousedown);
	self.listen('mouseover: main', mouseover);
	
	function init(){
		FloatingTranslation = document.get('main-translation');
	}
	function setRegExp(data){
		REGEXP = new RegExp(data.data, 'g');
	}
	function parseText(data){
		var LANGUAGE_WORDS = Words.get(data.language),
			array = data.content.replace(/\n/g, ' <br> ').replace(/ +/g, ' ').split(' '),
			length = array.length,
			i = -1,
			word, tag, box;

		Text.set('language', data.language);
		Text.set('title', data.title);
		Text.set('source', data.source);

		Cache = [];
		CleanIndexesDOM = new Map;

		while(++i < length){
			word = array[i];
			box = word.toLowerCase().replace(REGEXP, '');
			if(!CleanIndexesDOM.has(box)){
				CleanIndexesDOM.set(box, []);
			}
			if(word === '<br>'){
				Cache.push(word);
				continue;
			}
			CleanIndexesDOM.get(box).push(i);
			tag = LANGUAGE_WORDS.has(box)? 'y' : 'x';
			Cache.push('<' + tag + '>' + word + '</' + tag + '>');
		}
		
		render();
		bindDOMReferences();
		self.deity.closeModule();

		Text.set('number: all', data.words);
		Text.set('number: unique', data.words_unique);
		Text.set('words: all', Cache);
	}
	function bindDOMReferences(){
		CleanDOMReferences = new Map;
		var content = document.get('text_reading_content').children,
			box = {},
			iterator = CleanIndexesDOM.keys(),
			array;
		while(true){
			box = iterator.next();
			if(box.done) break;
			array = CleanIndexesDOM.get(box.value).map(index => content[index]);
			CleanDOMReferences.set(box.value, array);
		}
	}
	function replaceNodes(target, cleanWord, logic){
		var content = target.parentNode,
			dom = document.createElement(logic? 'y' : 'x'),
			array = CleanDOMReferences.get(cleanWord), // array of references to Nodes with the given textContent
			length = array.length;
		
		let i = -1,
			box,
			element;
		
		while(++i < length){
			element = array[i];
			box = dom.cloneNode();
			box.textContent = element.textContent;
			array[i] = box;
			content.replaceChild(box, element);
		}
	}
	function render(){
		var max = Cache.length, i = -1, string = '';
		while(++i < max) string += Cache[i] + ' ';
		var title = '<div id="text_reading_title"><h1>' + Text.get('title') + '</h1></div>',
			content = '<div id="text_reading_content">' + string + '</div>',
			source = '<div id="text_reading_source">Source: <a>' + Text.get('source') + '</a></div>';
		self.place.innerHTML = title + content + source;
	}
	function click(event){
		var time = Date.now(),
			target = event.target,
			tag = target.tagName.toLowerCase(),
			text, logic;
		
		if(!allowedTags.has(tag)){
			return;
		}

		text = target.textContent.toLowerCase().replace(REGEXP, '');
		
		if(text === ''){
			return;
		}

		logic = tag === 'x';
		replaceNodes(target, text, logic);

		setTimeout(function(){
			time = Date.now() - time;
			console.log(time, 'ms');
			websocket.sendJSON({
				event: 'wordState',
				state: logic,
				word: text
			});
			Words.get(Text.get('language'))[logic? 'add' : 'delete'](text);
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
			hideTranslation();
			FloatingTranslation.innerHTML = '';
			self.deity.shout('translation: Chill Out');
			return;
		}
		var clean = event.target.textContent.toLowerCase().replace(REGEXP, '');
		self.deity.shout('translation: from', clean); // for translation
		if(clean === lastWord){
			lastWord = clean;
			showTranslation(event);
		} else {
			websocket.sendJSON({
				event: 'getTranslation',
				from: clean
			});
		}
	}
	function hideTranslation(){
		self.deity.shout('css', ['main-css', {
			'#main-translation': {
				right: '-300px',
				bottom: '-300px'
			}
		}]);
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
	function showTranslation(){
		self.deity.shout('css', ['main-css', {
			'#main-translation': {
				'animation': 'main-translation 1s',
				'animation-fill-mode': 'forwards',
				'bottom': (screen.height - screen.availTop - Position.y - 40) + 'px',
				'right': (screen.width - screen.availLeft - Position.x - 40) + 'px'
			}
		}]);
	}
	function gotMyWords(data){
		Words.set(data.language, new Set(data.words));
	}
})();