(function SKY_ADD_TEXT(){
	'use strict';

	var self = new SkyModule({ route: '/text_add', view, destructor: saveState });
	self.listen('keydown: 50', show);
	self.listen('websocket: languages', saveLanguages);
	self.listen('websocket: Text Submit Success', success);
	self.listen('websocket: Text Submit Failed', failure);
	self.set('boolean', false);
	// self.set('languages', null);

	self.set('button: Yes', m('button', { onclick: submitText }, 'Yes'));
	self.set('button: No', m('button', { onclick: cancelSubmitText }, 'No'));
	self.set('button: Ok', m('button', { onclick: endSubmit }, 'Ok'));
	self.set('p: default', m('p', { id: 'sky-confirm' }));
	self.set('p: success', m('p', { id: 'sky-confirm', innerHTML: '<g>Text successfully submitted.</g>' }));
	self.set('p: failure', m('p', { innerHTML: 'Text with such title already exists. See [1] if you\'re not duplicating it.' }));

	self.set('initial', [ self.get('p: default'), self.get('button: No'), self.get('button: Yes') ]);
	self.set('confirmation', self.get('initial'));
	self.set('success', [ self.get('p: success'), self.get('button: Ok') ]);
	self.set('failure', [ self.get('p: failure'), self.get('button: Ok') ]);

	function show(){
		self.deity.watchMe(self);
		self.show();
		putLanguages();
		restoreState();
	}
	function putLanguages(){
		m.render(document.get('text_add_language_select'), self.get('languages'));
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
						m('select', { id: 'text_add_language_select' }) // languages will be added after rendering
					]),
					m('div', { id: 'text_add_submit' }, [
						m('button', { id: 'text_add_submit', onclick: beforeSubmitText }, 'Add text')
					])
				])
			])
		]
	}
	function saveState(){
		self.set('boolean', true);
		self.set('language', document.get('text_add_language_select').value);
		self.set('title', document.get('text_add_title_input').value);
		self.set('content', document.get('text_add_content_textarea').value);
		self.set('source', document.get('text_add_source_input').value);
	}
	function restoreState(){
		if(!self.get('boolean')){
			return;
		}
		document.get('text_add_language_select').value = self.get('language');
		document.get('text_add_title_input').value = self.get('title');
		document.get('text_add_content_textarea').value = self.get('content');
		document.get('text_add_source_input').value = self.get('source');
	}
	function wipeState(){
		document.get('text_add_title_input').value = '';
		document.get('text_add_content_textarea').value = '';
		document.get('text_add_source_input').value = '';
	}
	function saveLanguages(){
		self.set('languages', self.request('languages').map(lang => 
			m('option', { value: lang.id }, lang.name)
		));
	}
	function beforeSubmitText(){
		saveState();
		var select = document.get('text_add_language_select');
		var language = select.options[parseInt(select.value) - 1].text;
		self.popup.render(self.get('confirmation'), 'Are you sure the selected language <b>[' + language + ']</b> is correct?');
	}
	function submitText(event){
		event.preventDefault();
		self.popup.hide();
		setTimeout(function(){
			websocket.sendJSON({
				event: 'submitText',
				title: self.get('title'),
				content: self.get('content'),
				source: self.get('source'),
				language: self.get('language')
			});
		}, 250);
	}
	function cancelSubmitText(event){
		event.preventDefault();
		self.popup.hide();
	}
	function success(data){
		wipeState();
		self.popup.render(self.get('success'));
	}
	function endSubmit(){
		self.popup.hide();
	}
	function failure(){
		self.popup.render(self.get('failure'));
	}
})();