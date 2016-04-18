(function SKY_BROWSE_TEXTS(){
	'use strict';

	var self = new SkyModule({ route: '/text_browser', view, destructor: saveState }); //true -> self.addRoute on init
	self.listen('keydown: 49', show);
	self.listen('websocket: titles', putContent);
	self.set('boolean', false);

	function show(){
		self.deity.watchMe(self);
		self.show();
		self.set('place', document.get('text_browser_content'));
		self.deity.watch(self.get('place'), 'click', selectTitle);
		restoreState();
	}
	function view(){
		return [
			m('div', {class: 'sky-title'}, [ m('h1', 'Browse texts') ]),
			m('div', {class: 'sky-main'}, [
				m('div', { className: 'relative' }, [
					m('div', { id: 'text_browser_topbar' }, [
						m('span', 'Sort by:'),
						m('select', { id: 'browser_sort_what' }, [
							m('option', {value: 1}, 'id'),
							m('option', {value: 2}, 'title'),
							m('option', {value: 3}, 'length')
						]),
						m('select', { id: 'browser_sort_how' }, [
							m('option', {value: 1}, 'ASC'),
							m('option', {value: 2}, 'DESC')
						]),
						m('input', { id: 'browser_contains', placeholder: 'What should the text titles contain?' }),
						m('button', {type: 'button', id: 'text_browser_browse', onclick: getTexts }, 'Get texts'),
						m('span', { class: 'text_browser_info' }, 'Text size | Who submitted | Language')
					])
				]),
				m('div', { id: 'text_browser_content', class: 'window_result' })
			])
		]
	}
	function getTexts(event){
		event.preventDefault();

		var what = document.get('browser_sort_what');
		var how = document.get('browser_sort_how');

		what = what.options[what.selectedIndex].text;
		how = how.options[how.selectedIndex].text;
		
		websocket.sendJSON({
			event: 'getTitles',
			what: what,
			how: how,
			contains: document.get('browser_contains').value
		});
	}
	function selectTitle(event){
		var id;
		if((/title#[0-9]+/).test(event.target.id)) id = event.target.id;
		else if((/title#[0-9]+/).test(event.target.parentNode.id)) id = event.target.parentNode.id;
		if(id === undefined){
			return;
		}
		id = parseInt(id.replace('title#', ''));
		if(id === NaN || id <= 0){
			return; // really?
		}
		websocket.sendJSON({ event: 'pullText', id: id });
	}
	function putContent(data){
		var fragment = document.createDocumentFragment();
		var span = document.createElement('span');
		var div, box;
		data.data.map(text => {
			div = document.createElement('DIV');
			div.id = 'title#' + text.id;
			div.className = 'text-title';
			div.appendChild(span.cloneNode());
			div.appendChild(span.cloneNode());
			div.childNodes[0].textContent = text.title;
			div.childNodes[1].textContent = text.length + ' | ' + text.author + ' | ' + text.language;
			fragment.appendChild(div);
		});
		self.get('place').innerHTML = '';
		self.get('place').appendChild(fragment.cloneNode(true));
	}
	function saveState(){
		self.set('boolean', true);
		self.set('sort_what', document.get('browser_sort_what').value);
		self.set('sort_how', document.get('browser_sort_how').value);
		self.set('contains', document.get('browser_contains').value);
		self.set('content', document.get('text_browser_content').innerHTML);
	}
	function restoreState(){
		if(!self.get('boolean')){
			return;
		}
		document.get('browser_sort_what').value = self.get('sort_what');
		document.get('browser_sort_how').value = self.get('sort_how');
		document.get('browser_contains').value = self.get('contains');
		document.get('text_browser_content').innerHTML = self.get('content');
	}
})();