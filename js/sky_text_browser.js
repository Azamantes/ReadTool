// m.render(DOM('browser'), View.Browser());

(function(){
	'use strict';

	var place;
	var state = new Map;
	state.set('boolean', false);

	var self = new NinjaModule(true);
	self.listen('keydown: 49', show);
	self.listen('websocket: titles', putContent);
	self.component.view = view;
	self.route = '/text_browser';
	self.destructor = saveState;

	function show(){
		self.deity.watchMe(self);
		self.show();
		place = document.get('text_browser_content');
		self.deity.watch(place, 'click', selectTitle);
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
		what = what.options[what.selectedIndex].text;
		var how = document.get('browser_sort_how');
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
			return; //really?
		}
		console.log('Wybrano tytul:', id);
		// document.get('main').innerHTML = '';
		websocket.sendJSON({
			event: 'pullText',
			id: id
		});

	}
	function putContent(data){
		data = data.data;
		var box;
		var fragment = document.createDocumentFragment();
		var div;

		data.map(text => {
			div = document.createElement('DIV');
			div.id = 'title#' + text.id;
			div.className = 'text-title';
			div.appendChild(document.createElement('span'));
			div.appendChild(document.createElement('span'));
			div.childNodes[0].textContent = text.title;
			div.childNodes[1].textContent = text.length + ' | ' + text.author + ' | ' + text.language;
			fragment.appendChild(div);
		});
		place.innerHTML = '';
		place.appendChild(fragment.cloneNode(true));
	}
	function saveState(){
		state.set('boolean', true);
		state.set('sort_what', document.get('browser_sort_what').value);
		state.set('sort_how', document.get('browser_sort_how').value);
		state.set('contains', document.get('browser_contains').value);
		state.set('content', document.get('text_browser_content').innerHTML);
	}
	function restoreState(){
		if(!state.get('boolean')){
			return;
		}
		document.get('browser_sort_what').value = state.get('sort_what');
		document.get('browser_sort_how').value = state.get('sort_how');
		document.get('browser_contains').value = state.get('contains');
		document.get('text_browser_content').innerHTML = state.get('content');
	}
})();