(function(){
	'use strict';
	
	var TEXT = new Map;

	var DirtyClean; // Map
	var CleanIndexes; // Map
	var Cache; // []
	var REGEXP = /[0-9\/»«\:;'"„“”\[\]\{\}~<>\|\!@#\$%\^&\*\)\(\+\=\.,_—–\-\?]/g;

	var self = new MainModule;
	self.listen('mouseclick: menu: Text', render);
	self.listen('websocket: pulledText', parseText);
	self.deity.watch(document.get('main'), 'mousedown', (event) => event.preventDefault());
	self.deity.watch(document.get('main'), 'click', click);

	function parseText(data){
		var time = Date.now();
		Cache = [];
		// Cache = document.createDocumentFragment();
		var box, i = 0;
		var space = new Text(' ');
		DirtyClean = new Map;
		CleanIndexes = new Map;
		data.content.replace(/\n/g, ' <br> ').replace(/ +/g, ' ').split(' ').map(word => {
			box = word.toLowerCase().replace(REGEXP, '');
			DirtyClean.set(word, box);
			if(!CleanIndexes.has(box)){
				CleanIndexes.set(box, []);
			}
			CleanIndexes.get(box).push(i);

			if(word === '<br>'){
				Cache.push(document.createElement('br'));
				// Cache.appendChild(document.createElement('br'));
			} else {
				box = document.createElement('x');
				box.textContent = word;
				Cache.push(box);
				Cache.push(space.cloneNode(true));
				++i;
				// word === '<br>'? word : '<x>' + word + '</x> '
			}
			++i;
		});
		TEXT.set('title', data.title);

		render();
		self.deity.closeModule();

		TEXT.set('number: all', data.words);
		TEXT.set('number: unique', data.words_unique);
		TEXT.set('words: all', Cache);
		TEXT.set('words: unique', new Set(data.content_clean.split(' ')));
		TEXT.set('source', data.source);
		
		time = Date.now() - time;
		console.log('Parsing: ' + time + 'ms');
	}
	function render(){
		// var title = '<div id="text_reading_title">' + TEXT.get('title') + '</div>';
		// var content = '<div id="text_reading_content">' + Cache.join('') + '</div>';
		// var source = '<div id="text_reading_source">Source: <a>' + TEXT.get('source') + '</a></div>';
		self.place.innerHTML = '';
		var time = Date.now();
		var box = document.createDocumentFragment();
		Cache.map(x => box.appendChild(x));
		time = Date.now() - time;
		console.log(time, 'ms');
		var x = document.createElement('div');
		x.appendChild(box);
		self.place.appendChild(x);
		// self.place.innerHTML = x.innerHTML;
		// self.place.innerHTML = title + content + source;
	}

	var allowedTags = new Set(['X', 'Y']);
	function click(event){
		event.preventDefault();
		var time = Date.now();

		var tag = event.target.tagName;
		var text = event.target.textContent.replace(REGEXP, '');
		if(text === '' || !allowedTags.has(tag)){
			return;
		}
		text = DirtyClean.get(event.target.textContent);
		
		// call homies
		var regexp = new RegExp(tag.toLowerCase() + '>', 'g');
		// var to = tag === 'X'? 'y>' : 'x>';
		var to = tag === 'X'? 'y' : 'x';
		var box;
		CleanIndexes.get(text).map(index => {
			box = document.createElement(to);
			box.textContent = Cache[index].textContent;
			Cache[index] = box;
			// Cache[index] = Cache[index].replace(regexp, to);
		});
		render();
		time = Date.now() - time;
		console.log('Call homies:', time, 'ms');
	}
})();