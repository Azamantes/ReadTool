'use strict';
// ----------------------------
// Native Function extensions
// ----------------------------
Function.prototype.hasAncestor = function(ancestor){
	return !!(this.prototype.constructors && this.prototype.constructors.has(ancestor));
};
Function.prototype.descend = function(constructor){
	let i;
	for(i in constructor.prototype){
		if(constructor.prototype.hasOwnProperty(i)){
			this.prototype[i] = constructor.prototype[i];
		}
	}
	this.prototype.constructors = this.prototype.constructors || new Set; // create constructors list if inheriting for the first time.
	this.prototype.constructors.add(constructor); // add ancestor to list of ancestors
	this.prototype.constructor = this; // keep pointer to own class
};
console.log('Function.prototype.hasAncestor -> checks ancestry all the way up.');
console.log('Function.prototype.descend -> inherits from gives ancestor "class" and keeps own constructor pointer.');

// ----------------------------
// Native Object extensions
// ----------------------------
Object.prototype.define = function(property, config){
	Object.defineProperty(this, property, config);
};
Object.prototype.toArray = function(){
	return Object.keys(this);
};
console.log('Object.prototype.define -> same as Object.defineProperty');
console.log('Object.prototype.toArray -> returns array of pais [key, value]');

// ----------------------------
// Native Document extensions
// ----------------------------
document.get = document.getElementById;
document.Fragment = new Proxy(function(){}, {
	construct: function(target, argumentsList, newTarget){
		return document.createDocumentFragment();
	}
});

console.log('document.get -> shorthand for document.getElementById');
console.log('new document.Fragment -> same as document.createDocumentFragment()');
// ----------------------------
// Native JSON extensions
// ----------------------------
JSON.cleanString = function(value){
	return JSON.stringify(value).replace(/"/g, '');
};
console.log('JSON.cleanString -> JSON.stringify without " inside the string.');

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
console.log('String.prototype.escape -> escapes regexp sensitive characters.');