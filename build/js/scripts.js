(function(m, jscolor, console, USER_ID){
	'use strict';

	// ----------------------------
	// Native Function extensions
	// ----------------------------
	// Function.prototype.hasAncestor = function(ancestor){
	// 	return !!(this.prototype.constructors && this.prototype.constructors.has(ancestor));
	// };
	// Function.prototype.descend = function(constructor){
	// 	let i;
	// 	for(i in constructor.prototype){
	// 		if(constructor.prototype.hasOwnProperty(i)){
	// 			this.prototype[i] = constructor.prototype[i];
	// 		}
	// 	}
	// 	this.prototype.constructors = this.prototype.constructors || new Set(); // create constructors list if inheriting for the first time.
	// 	this.prototype.constructors.add(constructor); // add ancestor to list of ancestors
	// 	this.prototype.constructor = this; // keep pointer to own class
	// };
	// console.log('Function.prototype.hasAncestor -> checks ancestry all the way up.');
	// console.log('Function.prototype.descend -> inherits from gives ancestor "class" and keeps own constructor pointer.');

	// ----------------------------
	// Native Object extensions
	// ----------------------------
	Object.prototype.define = function(property, config){
		Object.defineProperty(this, property, config);
	};
	Object.prototype.toArray = function(){
		return Object.keys(this);
	};
	// console.log('Object.prototype.define -> same as Object.defineProperty');
	// console.log('Object.prototype.toArray -> returns array of pais [key, value]');

	// ----------------------------
	// Native Document extensions
	// ----------------------------
	document.get = document.getElementById;
	document.Fragment = new Proxy(function(){}, {
		construct: function(){
			return document.createDocumentFragment();
		}
	});

	// console.log('document.get -> shorthand for document.getElementById');
	// console.log('new document.Fragment -> same as document.createDocumentFragment()');
	// ----------------------------
	// Native JSON extensions
	// ----------------------------
	JSON.cleanString = function(value){
		return JSON.stringify(value).replace(/"/g, '');
	};
	// console.log('JSON.cleanString -> JSON.stringify without " inside the string.');

	// Map.prototype.toArray = function(key){
	// 	return Array.from(this.get(key) || []);
	// };
	// console.log('Map.prototype.toArray -> returns array of values under given key.');

	// ----------------------------
	// Native String extensions
	// ----------------------------
	String.prototype.myEscape = function(){
	    return this.replace(/[-\/\\^$*+?.()[\]{}]/g, '\\$&'); // no /
	};
	// console.log('String.prototype.escape -> escapes regexp sensitive characters.');

	// ----------------------------
	// Native WebSocket extensions
	// ----------------------------
	WebSocket.prototype.sendJSON = function(data){
		websocket.send(JSON.stringify(data));
	};

	class Watchdogs {
		constructor() {
			this.events = new Map();
			this.requests = new Map();
			// this.watchdogs = new Set;
			this.currentModule = null;
			this.values = new Map();
			this.listeners = [];
		}
		init() {
			this.shout('init: routes');
			this.events.get('init').map(initialize => initialize());
			this.events.set('init', []);
		}
		listen(event, listener) {
			if(! (listener instanceof Function)) {
				throw new Error('Provided listener is not a function.');
			}
			if(!this.events.has(event)) {
				this.events.set(event, []);
			}
			this.events.get(event).push(listener);
		}
		shout(event, message) {
			if(!this.events.has(event)) {
				return;
			}
			this.events.get(event).map(listener => listener(message));
		}
		register(request, listener) { // (string, function) // listener makes his private values available for others
			if(this.requests.has(request)) {
				throw new Error('Sandbox:', request, ' -> Already registered.');
			}
			this.requests.set(request, listener);
		}
		request(request) { // (string, function)
			if(!this.requests.has(request)) {
				throw new Error('No registered value for request \'' + request + '\'.');
			}
			return this.requests.get(request)();
		}
		watch(element, event, callback) {
			if(!element) throw new Error('No element given.');
			if(!event) throw new Error('No event given.');
			if(callback === null) {
				callback = element.constructor === String? (e) => {
					this.shout(event + ': ' + e.target.id, e);
				} : () => {};
			}
			if(!callback) throw new Error('No callback given.');
			if(element.constructor === String) {
				element = document.get(element);
			}
			if(element === null) {
				throw new Error('There is no such DOM element.');
			}
			if(Object.prototype.toString.call(callback) !== '[object Function]') {
				throw new Error('Given callback is not a function.');
			}
			// this.watchdogs.push({ element, callback });
			element.addEventListener(event, callback);
		}
		watchMe(module) {
			if(this.currentModule === module) {
				return;
			}
			if(this.currentModule instanceof SkyModule) {
				this.currentModule.close(false);
				this.currentModule = null;
			} else if(this.currentModule instanceof MainModule) {
				this.currentModule.close();
				this.currentModule = null;
			}
			this.currentModule = module;
		}
		unwatchModule(module) {
			if(this.currentModule !== module) {
				throw new Error('I\'m not watching you, dummy!');
			}
			this.currentModule = null;
		}
		closeModule() {
			if(this.currentModule === null) {
				return;
			}
			this.currentModule.close();
		}
		get(key) {
			if(this.values.has(key)) {
				return this.values.get(key);
			} else throw new Error('There is no such value registered.');
		}
		set(key, value) {
			if(this.values.has(key)) {
				throw new Error('This property had already been set.');
			}
			this.values.set(key, value);
		}
		startWatching() {
			this.listeners.map(listener => this.watch(listener.element, listener.event, listener.callback));
		}
		add(listener) {
			this.listeners.push(listener);
		}
	}
	class MainModule {
		constructor (config = {}) {
			// super();
			this.container = {};
			this.keys = new Set();
			this.view_compiled = config.view ? config.view() : null;
			this.references = [];
			this.eventListeners = [];
			this.construct = config.construct || null;
			this.destructor = config.destructor || null; //additional function to call when closing module
		}
		set(key, value) {
			this.container[key] = value;
			this.keys.add(key);
		}
		get(key) {
			return this.container[key];
		}
		has(key) {
			return this.keys.has(key);
		}
		delete(key) {
			this.keys.delete(key);
		}
		getReferences() {
			this.references.map(ref => {
				this.set(ref.key, document.get(ref.value));
			});
		}
		freeReferences() {
			this.references.map(ref => {
				if(!ref.const) this.set(ref.key, null);
			});
		}
		addEventListeners() {
			this.eventListeners.map(listener => {
				this.get(listener.element).addEventListener(listener.event, listener.callback);
			});
		}
		removeEventListeners() {
			this.eventListeners.map(listener => {
				this.get(listener.element).removeEventListener(listener.event, listener.callback);
			});
		}
		listen(event, callback) {
			this.deity.listen(event, callback);
		}
		request(value) {
			return this.deity.request(value);
		}
		register(event, callback) {
			this.deity.register(event, callback);
		}
		watch(element, event, callback) {
			document.get(element).addEventListener(event, callback);
		}
		bound(method) {
			return this[method].bind(this);
		}
	}
	MainModule.prototype.place = null;
	MainModule.prototype.popup = {
		place: null,
		show: function(){
			this.place.className = 'appear';
		},
		hide: function(){
			this.place.className = 'disappear';
		},
		render: function(view, text){
			m.render(this.place, view);
			if(text) document.get('sky-confirm').innerHTML = text;
			this.show();
		}
	};

	class SkyModule extends MainModule {
		// static CONSTANT = 10;
		constructor(config = {}) {
			super(config);
			this.route = config.route;
			this.component = {
				controller: function(){},
				view: () => this.view_compiled
			};
			if(this.route) this.listen('init', this.bound('addRoute'));
		}
		addRoute() {
			this.deity.shout('add route', {
				route: this.route,
				component: this.component
			});
		}
		show() {
			m.route(this.route);
			this.getReferences();
			this.addEventListeners();
			if(this.construct) this.construct();
			this.place.className = 'appear';
		}
		close(fog = true) {
			this.removeEventListeners();
			this.freeReferences();
			if(this.destructor) this.destructor();
			this.deity.unwatchModule(this);
			if(!fog) return;
			this.place.classList.add('disappear');
			setTimeout(() => {
				if(this.place.classList.contains('disappear')){
					this.place.className = 'hidden';
				}
			}, 250);
		}
	}
	SkyModule.prototype.place = null;
	
	const websocket = new WebSocket('ws://127.0.0.1:8090');
	const Watchdog = new Watchdogs();

	MainModule.prototype.deity = Watchdog;
	SkyModule.prototype.deity = Watchdog;
	
	(function KEYBOARD(){
		const self = new SkyModule();
		self.listen('mouseclick::', checkMouse);
		self.listen('keyboard: keydown', checkKeyboard);
		self.listen('keyboard: keyup', checkKeyboard);
		self.register('keyboardFree', () => self.get('keyboardFree'));
		self.set('forbidden: clicks', new Set(['INPUT', 'TEXTAREA']));
		self.set('forbidden: keys', new Set([9]));
		self.set('keyboardFree', true);
		
		function checkMouse(event){
			let logic = self.get('forbidden: clicks').has(event.target.tagName);
			self.set('keyboardFree', !logic);
		}
		function checkKeyboard(event){
			if(!self.get('keyboardFree')) return;
			let logic = self.get('forbidden: keys').has(event.keyCode) && self.get('forbidden: clicks').has(event.target.tagName);
			self.set('keyboardFree', !logic);
		}
	})();
	
	(function LANGUAGE(){
		const self = new MainModule();
		self.listen('init', init);
		self.listen('mouseclick: Language From', language_from);
		self.listen('mouseclick: Language To', language_to);
		self.listen('websocket: Language From', (data) => {
			self.get('from').textContent = 'From: [' + data.data + ']';
		});
		self.listen('websocket: Language To', (data) => {
			self.get('to').textContent = 'To: [' + data.data + ']';
		});
		self.listen('websocket: languages', getLanguages);
		
		function init(){
			self.set('from', document.get('language_from').parentNode.childNodes[0]);
			self.get('from').textContent = 'From';
			self.get('from').innerHTML = '';
			self.set('to', document.get('language_to').parentNode.childNodes[0]);
			self.get('to').textContent = 'To';
			self.get('to').innerHTML = '';
		}
		function language_from(event){
			if(event.target.tagName !== 'P'){
				return;
			}
			websocket.sendJSON({
				event: 'changeLanguageFrom',
				data: event.target.textContent
			});
		}
		function language_to(event){
			if(event.target.tagName !== 'P'){
				return;
			}
			websocket.sendJSON({
				event: 'changeLanguageTo',
				data: event.target.textContent
			});
		}
		function getLanguages(data){
			const array = data.data;
			const fragment = document.createDocumentFragment();
			let box;

			self.register('languages', () => array);
			array.map(language => {
				box = document.createElement('p');
				box.class = language.id;
				box.short = language.shorthand;
				box.textContent = language.name;
				fragment.appendChild(box);
			});
			document.get('language_from').appendChild(fragment.cloneNode(true));
			document.get('language_to').appendChild(fragment.cloneNode(true));
		}
	})();
	
	(function SKY_ROUTES(){
		const self = new SkyModule({ route: '/', view });
		self.listen('add route', addRoute);
		self.listen('init routes', init);
		self.set('routes', {});
		
		function init(){
			m.route(document.get('sky'), '/', self.get('routes'));
		}
		function addRoute(data){
			self.get('routes')[data.route] = data.component;
		}
		function view(){
			return m('div');
		}
	})();
	
	(function SKY_HELP(){
		const self = new SkyModule({ route: '/help', view }); //true -> self.addRoute on init
		self.listen('menu: Help', show);

		function show(){
			self.show();
			self.deity.watchMe(self);
		}
		function view(){
			return m('div', { id: 'help_sky' }, [
				m('h3', 'TOPBAR'),
				m('p', { innerHTML: '<b>Settings</b> :: various account settings' }),
				m('p', { innerHTML: '<b>From</b> :: the language you learn (affects browsed texts)' }),
				m('p', { innerHTML: '<b>To</b> :: a language you know (affects translations)' }),
				m('h3', 'LEFT'),
				m('p', { innerHTML: '<i>inactive (for now)</i>' }),
				m('h3', 'RIGHT'),
				m('p', { innerHTML: '<b>Add translation</b>' }),
				m('ul', [
					m('li', { innerHTML: 'From :: a word to translate' }),
					m('li', { innerHTML: 'To :: your translation of the word' })
				]),
				m('h3', 'CENTER'),
				m('span', 'This is your dojo.' )
			]);
		}
	}());
	
	(function SKY_LOGOUT(){
		const self = new SkyModule({ route: '/logout', view });
		self.listen('menu: Logout', show);

		function show(){
			self.show();
			self.deity.watchMe(self);
		}
		function view(){
			const FORM = {
				head: m('div', { class: 'form-head' }),
				body: m('div', { class: 'form-body' }),
				bottom: m('div', { class: 'form-bottom' })
			};
			FORM.head.children.push(
				m('h2', 'Logout'),
				m('div', 'Press Continue to continue.')
			);
			FORM.bottom.children.push(
				m('button', { onclick: logout }, 'Continue'),
				m('button', { onclick: back }, 'Back')
			);
			return m('div', { id: 'logout_sky', className: 'form' }, [
				m('form', [ FORM.head, FORM.bottom ])
			]);
		}
		function logout(event){
			event.preventDefault();
			window.location.href = 'logout.php';
		}
		function back(event){
			event.preventDefault();
			self.close();
		}
	})();
	
	(function SKY_SETTINGS(){
		const self = new SkyModule({ route: '/settings', view, construct });
		self.listen('menu: Settings', show);
		self.listen('websocket: Password Incorrect', incorrectPassword);
		self.listen('websocket: Password Changed', changedPassword);
		self.listen('websocket: Color Set', setColorInit);
		self.listen('websocket: Color Not Set', () => { console.log('Failed to set'); });

		self.set('view: confirmation', [
			m('p', { id: 'sky-confirm' }),
			m('button', { onclick: (event) => {
				event.preventDefault();
				self.popup.hide();
				self.get('password: input').value = '';
			} }, 'Ok')
		]);
		self.set('color: cache', '');
		
		self.references.push({ key: 'password: input', value: 'settings-password' }); //set each time the module is shown
		self.references.push({ key: 'password: button', value: 'settings-password-button' });
		self.references.push({ key: 'color1: input', value: 'settings-highlight-color1' });
		self.references.push({ key: 'color1: button', value: 'settings-highlight-color1-button' });
		self.references.push({ key: 'color2: input', value: 'settings-highlight-color2' });
		self.references.push({ key: 'color2: button', value: 'settings-highlight-color2-button' });
		self.references.push({ key: 'popup', value: 'sky-confirm-container', const: true });
		self.eventListeners.push({ element: 'password: button', event: 'click', callback: setPassword }); //set each time the module is shown
		// self.eventListeners.push({ element: 'color: input', event: 'change', callback: setColorCache });
		self.eventListeners.push({ element: 'color1: button', event: 'click', callback: setColor1 });
		self.eventListeners.push({ element: 'color2: button', event: 'click', callback: setColor2 });
		
		function construct(){
			jscolor.bind();
			putColor();
		}
		function show(){
			self.show();
			self.deity.watchMe(self);
		}
		function view(){
			return [
				m('div', { class: 'sky-title' }, m('h1', 'Settings')),
				m('div', { id: 'settings_sky', class: 'sky-main' }, [
					m('div', { id: 'settings-password-container' }, [
						m('div', { class: 'form-body' }, [
							m('div', { className: 'form-body-left' }, [
								m('span', 'New password')
							]),
							m('div', { className: 'form-body-right' }, [
								m('input', { id: 'settings-password', type: 'password' }),
								m('button', { id: 'settings-password-button', type: 'click' }, 'Set password'),
							])		
						]),
						m('div', { class: 'form-body' }, [
							m('div', { className: 'form-body-left' }, [
								m('span', 'Highlight #1')
							]),
							m('div', { className: 'form-body-right' }, [
								m('input', { id: 'settings-highlight-color1', class: 'color', value: '' }),
								m('button', { id: 'settings-highlight-color1-button', type: 'click' }, 'Set color')
							])
						]),
						m('div', { class: 'form-body' }, [
							m('div', { className: 'form-body-left' }, [
								m('span', 'Highlight #2')
							]),
							m('div', { className: 'form-body-right' }, [
								m('input', { id: 'settings-highlight-color2', class: 'color', value: '' }),
								m('button', { id: 'settings-highlight-color2-button', type: 'click' }, 'Set color')
							])
						])
					])
				])
			];
		}
		function setPassword(){
			websocket.sendJSON({
				event: 'changePassword',
				password: self.get('password: input').value
			});
		}
		function incorrectPassword(){
			self.popup.render(self.get('view: confirmation'), '<r>Given password is incorrect.</r>');
		}
		function changedPassword(){
			self.popup.render(self.get('view: confirmation'), '<g>Password changed.</g>');
		}
		function putColor(){
			const input1 = self.get('color1: input');
			const input2 = self.get('color2: input');
			const cache1 = self.get('color1: cache');
			const cache2 = self.get('color2: cache');
			input1.value = cache1;
			input2.value = cache2;
			input1.style.background = '#' + cache1;
			input2.style.background = '#' + cache2;
		}
		function setColorInit(data){
			const color = data.color;
			const number = parseInt(data.number);
			const name = 'color' + number;
			const css = number === 1? 'y' : 'y:hover';
			self.set(name + ': cache', data.color);
			document.get(`main-transation-${css}`).textContent = `${css}{background:#${color};}`;
		}
		function setColor1(){
			websocket.sendJSON({ event: 'setColor', color: self.get('color1: input').value, number: 1 });
		}
		function setColor2(){
			websocket.sendJSON({ event: 'setColor', color: self.get('color2: input').value, number: 2 });
		}
	})();
	
	(function SKY_ADD_TEXT(){
		const self = new SkyModule({ route: '/text_add', view, destructor: saveState });
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
			];
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
			const select = document.get('text_add_language_select');
			const language = select.options[parseInt(select.value) - 1].text;
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
		function success(){
			wipeState();
			// self.set('language', ''); // actually the language may stay
			self.set('title', '');
			self.set('content', '');
			self.set('source', '');
			self.popup.render(self.get('success'));
		}
		function endSubmit(){
			self.popup.hide();
		}
		function failure(){
			self.popup.render(self.get('failure'));
		}
	})();
	
	(function SKY_BROWSE_TEXTS(){
		const self = new SkyModule({ route: '/text_browser', view, destructor: saveState }); //true -> self.addRoute on init
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
			];
		}
		function getTexts(event){
			event.preventDefault();

			let what = document.get('browser_sort_what');
			let how = document.get('browser_sort_how');

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
			if(isNaN(id) || id <= 0){
				return; // really?
			}
			websocket.sendJSON({ event: 'pullText', id: id });
		}
		function putContent(data){
			const fragment = document.createDocumentFragment();
			const span = document.createElement('span');
			let div;
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
	
	(function TEXT(){
		// I'll leave normal variables here.

		var Words = new Map();
		var Text = new Map(); // overwriting native Text function
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

		var self = new MainModule();
		self.listen('init', init);
		self.listen('keydown: 49', hideTranslation);
		self.listen('keydown: 50', hideTranslation);
		self.listen('menu: Read Text', restoreState);
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
		function restoreState(){
			render();
			bindDOMReferences();
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
			CleanIndexesDOM = new Map();

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
			CleanDOMReferences = new Map();
			var content = document.get('text_reading_content').children,
				box = {},
				iterator = CleanIndexesDOM.keys(),
				array;
			const arrow = (index) => content[index];
			while(true){
				box = iterator.next();
				if(box.done) break;
				array = CleanIndexesDOM.get(box.value).map(arrow);
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
			let time = Date.now();
			const target = event.target;
			const tag = target.tagName.toLowerCase();
			
			if(!allowedTags.has(tag)) return;

			const text = target.textContent
				.toLowerCase()
				.replace(REGEXP, '');
			
			if(text === '') return;

			const logic = tag === 'x';
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
		
		const hiddenTranslationObject = {
			'#main-translation': {
				right: '-300px',
				bottom: '-300px',
			}
		};
		const hiddenTranslation = JSON.stringify(hiddenTranslationObject)
			.replace(/(^\{+|\"|\}+$)/g, '')
			.replace(/,/g, ';')
			.replace(/:{/, '{') + '}';

		function hideTranslation(){
			document.get('main-css').textContent = hiddenTranslation;
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
		
		const visibleTranslationObject = {
			'#main-translation': {
				'animation': 'main-translation 1s',
				'animation-fill-mode': 'forwards',
				'bottom': 'bottomValuepx',
				'right': 'rightValuepx',
			}
		};
		const visibleTranslation = JSON.stringify(visibleTranslationObject)
			.replace(/(^\{+|\"|\}+$)/g, '')
			.replace(/,/g, ';')
			.replace(/:{/, '{') + '}';
		function showTranslation(){
			let string = visibleTranslation
				.replace(/bottomValue/, screen.height - screen.availTop - Position.y - 40)
				.replace(/rightValue/, screen.width - screen.availLeft - Position.x - 40);			
			document.get('main-css').textContent = string;
		}
		function gotMyWords(data){
			Words.set(data.language, new Set(data.words));
		}
	})();
	
	(function TRANSLATION(){
		var self = new MainModule();
		self.listen('init', init);
		self.listen('translation: from', catchThat);
		self.listen('translation: Chill Out', () => self.set('chilling', true));
		self.listen('websocket: Translation Found', found);
		self.listen('websocket: Translation Added', clearAddTranslation);
		self.set('chilling', true);
		// self.set('lastTry', null);
		self.set('place: from', null);
		self.set('place: to', null);
		self.set('place: found', null);

		function init(){
			self.set('place: from', document.get('translation_add_from'));
			self.set('place: to', document.get('translation_add_to'));
			self.set('place: found', document.get('translation_found'));
			self.watch('translation_add_to', 'keydown', readySteady); // send translation via websocket
			self.watch('translation_find', 'keydown', findTranslation);
		}
		function catchThat(string){
			self.get('place: from').value = string;
			self.get('place: to').focus();
			self.set('chilling', false);
		}
		function findTranslation(event){
			const target = event.target;
			const keyNotEnter = event.keyCode !== 13;
			const differentValue = event.target.value === self.get('lastTry');
			
			if(keyNotEnter || differentValue){
				return; // nothind to do.
			}
			self.set('lastTry', target.value);
			websocket.sendJSON({
				event: 'getTranslation',
				from: target.value,
				find: true,
			});
		}
		function readySteady(event){
			const target = event.target;
			
			if(event.keyCode !== 13){
				return; //not enter or not focused
			}
			let from = self.get('place: from').value,
				to = target.value;
			if(!from || !to){
				return;
			}
			websocket.sendJSON({ event: 'addTranslation', from, to });
		}
		function clearAddTranslation(){
			if(self.get('chilling')){
				self.get('place: from').value = '';
			}
			self.get('place: to').value = '';
		}
		function found(data){
			var list = document.createElement('UL');
			var listElement = document.createElement('li');
			var box;
			data.translation.map(item => {
				box = listElement.cloneNode(true);
				box.textContent = item;
				list.appendChild(box);
			});
			self.get('place: found').replaceChild(list, self.get('place: found').firstChild);
		}
	})();
	
	(function WATCHDOG_STUFF(){
		Watchdog.watch(window, 'beforeunload', function(){
			websocket.sendJSON({ event: 'disconnect' });
			websocket.close();
		});
		Watchdog.watch(window, 'load', function(){
			MainModule.prototype.place = document.get('main');
			SkyModule.prototype.place = document.get('sky-container');
			MainModule.prototype.popup.place = document.get('sky-confirm-container');
			SkyModule.prototype.popup.place = document.get('sky-confirm-container');
			

			websocket.onopen = function(){
				console.log('Websocket connection is open.');
				websocket.sendJSON({
					event: 'connect',
					userID: USER_ID,
				});
			};
			websocket.onmessage = function(data){
				data = JSON.parse(data.data);
				if(data.event === 'bye'){
					websocket.close();
					return;
				}
				Watchdog.shout('websocket: ' + data.event, data);
			};

			let element = document.createElement('style');
			element.id = 'main-css';
			document.head.appendChild(element);
			element = document.createElement('style');
			element.id = 'main-transation-y';
			document.head.appendChild(element);
			element = document.createElement('style');
			element.id = 'main-transation-y:hover';
			document.head.appendChild(element);
			

			Watchdog.init();
			Watchdog.shout('init routes');
			Watchdog.watch(window, 'keydown', function(event){
				Watchdog.shout('keyboard: keydown', event);
				if(!Watchdog.request('keyboardFree')){
					return;
				}
				switch(event.keyCode){
					case 27: {
						Watchdog.closeModule(); 
						break;
					} //ESC
					default:
						Watchdog.shout('keydown: ' + event.keyCode);
						// Watchdog.shout('keydown: ' + String.fromCharCode(event.keyCode));
				}
			});
			
			Watchdog.watch(window, 'keyup', function(event){
				Watchdog.shout('keyboard: keyup', event);
			});
			Watchdog.watch(window, 'click', function(event){
				Watchdog.shout('mouseclick::', event); // more vague, not especially the "main", but it's ok
			});
			Watchdog.watch('main', 'mouseover', function(event){
				Watchdog.shout('mouseover: main', event); // more vague, not especially the "main", but it's ok
			});
			// Watchdog.add({ element: 'main', event: 'mousedown', callback: null });
			// Watchdog.add({ element: 'main', event: 'mousemove', callback: null });
			Watchdog.watch('main', 'mousedown', function(event){
				event.preventDefault();
				// Watchdog.shout('menu: ' + event.target.getAttribute('event'));
			});
			Watchdog.watch('menu', 'click', function(event){
				Watchdog.shout('menu: ' + event.target.getAttribute('event'));
			});
			// ------------
			// Top bar
			// ------------
			Watchdog.watch('topbar', 'click', function(event){
				Watchdog.shout('mouseclick: ' + (event.target.getAttribute('event') || event.target.parentNode.getAttribute('event')), event);
			});
			Watchdog.startWatching();
		});
	})();
	
	(function WORDS(){
		var self = new MainModule();
	})();
	
}(m, jscolor, window.console, USER_ID));