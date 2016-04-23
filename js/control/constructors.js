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
	