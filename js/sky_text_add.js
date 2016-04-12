(function(){
	'use strict';

	var state = new Map;
	state.set('boolean', false);
	var languages;

	var Views = new Map;
	Views.set('initial', [
		m('p', { id: 'sky-confirm' }),
		m('button', { onclick: cancelSubmitText }, 'No'),
		m('button', { onclick: submitText }, 'Yes')
	]);
	Views.set('confirmation', [
		m('p', { id: 'sky-confirm' }),
		m('button', { onclick: cancelSubmitText }, 'No'),
		m('button', { onclick: submitText }, 'Yes')
	]);
	Views.set('success', [
		m('p', { id: 'sky-confirm', innerHTML: 'Text successfully submitted.' }),
		m('button', { onclick: endSubmit }, 'Ok'),
	]);
	Views.set('failure', [
		m('p', { innerHTML: 'Text with such title already exists. See [1] if you\'re not duplicating it.' }),
		m('button', { onclick: cancelSubmitText }, 'Ok'),
	]);

	var self = new NinjaModule(true);
	self.listen('keydown: 50', show);
	self.listen('websocket: languages', saveLanguages);
	self.listen('websocket: Text Submit Success', success);
	self.listen('websocket: Text Submit Failed', failure);
	self.route = '/text_add';
	self.component.view = view;
	self.destructor = saveState;

	function show(){
		self.deity.watchMe(self);
		self.show();
		restoreState();
	}
	function view(){
		return [
			m('div', { class: 'sky-title' }, m('h1', 'Add new text')),
			m('div', { class: 'sky-main' }, [
				m('div', { class: 'relative' }, [
					m('div', { id: 'text_add_title' }, [
						m('span', { id: 'text_add_title_span' }, 'Title'),
						m('input', { id: 'text_add_title_input' })
					]),
					m('div', { id: 'text_add_content' }, [
						m('span', { id: 'text_add_content_span' }, 'Content'),
						m('textarea', { id: 'text_add_content_textarea' })
					]),
					m('div', { id: 'text_add_source' }, [
						m('span', { id: 'text_add_source_span' }, 'Source'),
						m('input', { id: 'text_add_source_input' })
					]),
					m('div', { id: 'text_add_language' }, [
						m('span', { id: 'text_add_language_span' }, 'Language'),
						m('select', { id: 'text_add_language_select' }, languages)
					]),
					m('div', { id: 'text_add_submit' }, [
						m('button', { id: 'text_add_submit', onclick: beforeSubmitText }, 'Add text')
					]),
					m('div', { id: 'sky-confirm-container', class: 'hidden' }, Views.get('initial'))
				])
			])
		]
	}
	function renderPopup(value, text){
		m.render(document.get('sky-confirm-container'), Views.get(value));
		if(text) document.get('sky-confirm').innerHTML = text;
	}
	function saveState(){
		state.set('boolean', true);
		state.set('language', document.get('text_add_language_select').value);
		state.set('title', document.get('text_add_title_input').value);
		state.set('content', document.get('text_add_content_textarea').value);
		state.set('source', document.get('text_add_source_input').value);
	}
	function restoreState(){
		if(!state.get('boolean')){
			return;
		}
		document.get('text_add_language_select').value = state.get('language');
		document.get('text_add_title_input').value = state.get('title');
		document.get('text_add_content_textarea').value = state.get('content');
		document.get('text_add_source_input').value = state.get('source');
	}
	function wipeState(){
		// document.get('text_add_language_select').value = ''; // doesn't matter
		document.get('text_add_title_input').value = '';
		document.get('text_add_content_textarea').value = '';
		document.get('text_add_source_input').value = '';
	}
	function saveLanguages(){
		languages = self.request('languages').map(lang => 
			m('option', { value: lang.id }, lang.name)
		);
	}
	function beforeSubmitText(){
		saveState();
		var select = document.get('text_add_language_select');
		var language = select.options[parseInt(select.value) - 1].text;
		renderPopup('confirmation', 'Are you sure the selected language <b>[' + language + ']</b> is correct?');
		document.get('sky-confirm-container').className = 'appear';
	}
	function submitText(event){
		event.preventDefault();
		document.get('sky-confirm-container').className = 'disappear';
		setTimeout(function(){
			websocket.sendJSON({
				event: 'submitText',
				title: state.get('title'),
				content: state.get('content'),
				source: state.get('source'),
				language: state.get('language')
			});
		}, 250);
	}
	function cancelSubmitText(event){
		event.preventDefault();
		document.get('sky-confirm-container').className = 'disappear';
	}
	function success(data){
		wipeState();
		renderPopup('success');
		setTimeout(function(){
			document.get('sky-confirm-container').className = 'appear';
		}, 250);
	}
	function endSubmit(){
		document.get('sky-confirm-container').className = 'disappear';
		setTimeout(function(){
			renderPopup('initial')
		}, 250);
	}
	function failure(){
		renderPopup('failure');
	}
})();