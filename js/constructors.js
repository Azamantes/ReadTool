'use strict';

//-------------------------
//		CSSClass
//-------------------------
function CSSClass(array){
	this.stylesheets = {};
	array.map(item => {
		this.add(item);
	});
}
CSSClass.prototype.add = function(referenceID){
	if(!referenceID){
		throw new Error('Given referenceID is invalid.');
	}
	if(document.get(referenceID) !== null){
		throw new Error('There is already a CSS stylesheet identified by given referenceID.');
	}
	var stylesheet = document.createElement('style');
	stylesheet.id = referenceID;
	document.head.appendChild(stylesheet);
	this.stylesheets[referenceID] = {
		ref: stylesheet,
		config: {}
	};
};
CSSClass.prototype.set = function(stylesheet, config){
	var string = '';
	Object.keys(config).map(key => {
		string += key + ' {\n';
		config[key].toArray().map(style => {
			string += '\t' + style + ': ' + config[key][style] + ';\n'
		});
		string += '}\n';
	});
	this.stylesheets[stylesheet].ref.textContent = string;
};

//-------------------------
//		Watchdogs
//-------------------------
function Watchdogs(){
	this.events = new Map;
	this.requests = new Map;
	// this.watchdogs = new Set;
	this.currentModule = null;
	this.values = new Map;
}
Watchdogs.prototype.init = function(){
	this.shout('init: routes');
	this.events.toArray('init').map(initialize => initialize());
	this.events.delete('init');
}
Watchdogs.prototype.listen = function(event, listener){
	if(! (listener instanceof Function)){
		throw new Error('Provided listener is not a function.');
	}
	if(!this.events.has(event)){
		this.events.set(event, new Set);
	}
	this.events.get(event).add(listener);
};
Watchdogs.prototype.shout = function(event, message){
	if(!this.events.has(event)){
		return;
	}
	this.events.toArray(event).map(listener => listener(message));
};
Watchdogs.prototype.register = function(request, listener){ // (string, function) // listener makes his private values available for others
	if(this.requests.has(request)){
		throw new Error('Sandbox:', request, ' -> Already registered.');
	}
	this.requests.set(request, listener);
}
Watchdogs.prototype.request = function(request, waiting){ // (string, function)
	if(!this.requests.has(request)){
		throw new Error('No registered value for request \'' + request + '\'.');
	}
	return this.requests.get(request)();
}
Watchdogs.prototype.watch = function(element, event, callback){
	if(!element) throw new Error('No element given.');
	if(!event) throw new Error('No event given.');
	if(!callback) throw new Error('No callback given.');
	if(element['constructor'] === String){
		element = document.get(element);
	}
	if(element === null){
		throw new Error('There is no such DOM element.');
	}
	if(Object.prototype.toString.call(callback) !== '[object Function]'){
		throw new Error('Given callback is not a function.');
	}
	// this.watchdogs.push({ element, callback });
	element.addEventListener(event, callback);
};
Watchdogs.prototype.watchMe = function(module){
	if(this.currentModule === module){
		return;
	}
	if(this.currentModule instanceof SkyModule){
		this.currentModule.close(false);
		this.currentModule = null;
	}
	if(! (module instanceof SkyModule)){
		throw new Error('This is not a ninja:', module);
	}
	this.currentModule = module;
};
Watchdogs.prototype.unwatchModule = function(module){
	if(this.currentModule !== module){
		throw new Error('I\'m not watching you, dummy!');
	}
	this.currentModule = null;
};
Watchdogs.prototype.closeModule = function(){
	if(this.currentModule === null){
		return;
	}
	this.currentModule.close();
}
Watchdogs.prototype.get = function(key){
	if(this.values.has(key)){
		return this.values.get(key);
	} else throw new Error('There is no such value registered.');
};
Watchdogs.prototype.set = function(key, value){
	if(this.values.has(key)){
		throw new Error('This property had already been set.');
	}
	values.set(key, value);
};

//------------------------------------
//		MithrilModule -> Main place
//------------------------------------
function MainModule(){
	this.container = new Map; // for storing values instead of creating variables in the code.
}
MainModule.prototype.place = null;
MainModule.prototype.set = function(key, value){
	this.container.set(key, value);
};
MainModule.prototype.get = function(key){
	return this.container.get(key);
};
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
MainModule.prototype.listen = function(event, callback){
	this.deity.listen(event, callback);
};
MainModule.prototype.request = function(value){
	return this.deity.request(value);
};
MainModule.prototype.register = function(event, callback){
	this.deity.register(event, callback);
};
MainModule.prototype.watch = function(element, event, callback){
	document.get(element).addEventListener(event, callback);
};
MainModule.prototype.bound = function(method){
	return this[method].bind(this);
};

//-------------------------
//		MithrilModule
//-------------------------
function SkyModule(self = {}){
	MainModule.call(this);
	const COMPILED_VIEW = self.view && self.view() || null;
	this.component = {
		controller: function(){},
		view: () => COMPILED_VIEW
	};	
	this.route = self.route;
	this.constructList = [];
	this.destructor = self.destructor || null; //additional function to call when closing module
	if(!!this.route){
		this.listen('init', this.bound('addRoute'));
	}
}
SkyModule.descend(MainModule);
SkyModule.prototype.addRoute = function(){
	this.deity.shout('add route', {
		route: this.route,
		component: this.component
	});
};
SkyModule.prototype.construct = function(){

};
SkyModule.prototype.show = function(){
	m.route(this.route);
	this.place.className = 'appear';
	this.construct();
};

SkyModule.prototype.close = function(fog = true){
	if(this.destructor instanceof Function){
		this.destructor();
	}
	this.deity.unwatchModule(this);
	if(!fog){
		return;
	}
	this.place.classList.add('disappear');
	setTimeout(() => {
		if(this.place.classList.contains('disappear')){
			this.place.className = 'hidden';
		}
	}, 250);
};