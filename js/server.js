'use strict';

var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({
	port: 8090
});
var database = require('mysql').createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'readtool',
	multipleStatements: true
});
database.connect();
Object.defineProperty(User.prototype, 'database', {
	get: () => database
});

const Global = new Map;
const Userlist = new Set;
const SQL_QUERIES = require('./sql_queries.js');

(function(){
	var box = [];
	database.query("SELECT id, name, shorthand FROM languages ORDER BY id;")
	.on('result', function(row){
		box.push({
			id: row.id,
			name: row.name,
			shorthand: row.shorthand
		});
	}).on('end', function(){
		Global.set('languages', box);
	});
})();



server.on('connection', function(client){
	var user = new User(client);
	client.on('message', function(data){
		try {
			data = JSON.parse(data);
			User.prototype.events.has(data.event) && user[data.event](data);
		} catch(error) {
			console.log(error.message);
		}
	})
});

function User(socket){
	this.userID = null;
	this.login = null;
	this.socket = socket;
	this.languages = new Map;
	Global.get('languages').map(data => {
		this.languages.set(data.id, new Set);
	});
	this.languageFrom = null;
	this.languageTo = null;
}
User.prototype.events = new Set([
	'connect',
	'disconnect',
	'changeLanguageFrom',
	'changeLanguageTo',
	'submitText',
	'getTitles',
	'pullText',
	'wordState',
	'addTranslation',
	'getTranslation'
]);
User.prototype.errorQuery = function(error){
	console.log(error.message);
};
User.prototype.query = function(sql, argv){
	return this.database.query(sql, argv || [])
	.on('error', this.errorQuery);
};
User.prototype.getWords = function(){};
User.prototype.getMyWords = function(){};

/*
 * CONNECTION
*/
User.prototype.identity = function(){
	return '[' + this.userID + ']', this.login;
};
User.prototype.connect = function(data){
	var userID = data.userID;
	database.query(SQL_QUERIES.connect, [userID])
	.on('result', (row) => {
		console.log(row.id, row.login, row.language_from, row.language_to);
		console.log('jest result connect', row.id, row.login);
		this.userID = row.id;
		this.login = row.login;
		this.languageFrom = row.language_from;
		this.languageTo = row.language_to;
		Userlist.add(this);
	}).on('end', () => {
		if(this.userID === null){
			console.log('this.userID:', this.userID);
			console.log('this.login:', this.login);
			return this.socket.disconnect();
		}
		this.unicast({ event: 'connected.' });
		Array.from(this.languages.keys()).map(language => {
			this.getMyWords(language);
		});
		this.unicast({ event: 'languages', data: Global.get('languages') });
		this.unicast({ event: 'RegExp', data: this.REGEXP_STRING });
		Global.get('languages').map(box => {
			if(box.id === this.languageFrom){
				this.unicast({ event: 'Language From', data: box.shorthand });
			}
			if(box.id === this.languageTo){
				this.unicast({ event: 'Language To', data: box.shorthand });
			}
		});
	});
};
User.prototype.getMyWords = function(language){
	database.query("SELECT content FROM words w, users_words uw WHERE uw.user = ? AND uw.word = w.id AND w.language = ?;", [ this.userID, language ])
	.on('result', (row) => {
		this.languages.get(language).add(row.content);
	}).on('end', () => {
		this.unicast({
			event: 'language: Words',
			language: language,
			words: Array.from(this.languages.get(language).values())
		});
	});
};
User.prototype.disconnect = function(){ //logout
	Userlist.delete(this);
	this.socket.close();
};
User.prototype.unicast = function(data){
	// console.log('Wysylam unicasta');
	this.socket.send(JSON.stringify(data));
}

/*
 * CHANGE LANGUAGE FROM / TO
*/
User.prototype.changeLanguageFrom = function(data){
	var language = data.data;
	if(!language || language['constructor'] !== String){
		return console.log('User ' + this.identity() + 'was trying to set some weird language_from:', language + '.');
	}
	database.query(SQL_QUERIES.changeLanguageFrom, [language, this.userID])
	.on('error', (error) => {
		console.log(this.identity(), ' ->', error.message);
	}).on('end', () => {
		Global.get('languages').map(box => {
			if(box.name === language){
				this.languageFrom = box.id; // for word translation
				this.unicast({
					event: 'Language From',
					data: box.shorthand
				});
			}
		});
	});
};
User.prototype.changeLanguageTo = function(data){
	var language = data.data;
	if(!language || language['constructor'] !== String){
		return console.log('User ' + this.identity() + 'was trying to set some weird language_to:', language + '.');
	}
	database.query(SQL_QUERIES.changeLanguageTo, [language, this.userID])
	.on('error', (error) => {
		console.log(this.identity(), ' ->', error.message);
	}).on('end', () => {
		Global.get('languages').map(box => {
			if(box.name === language){
				this.languageTo = box.id; // for word translation
				this.unicast({
					event: 'Language To',
					data: box.shorthand
				});
			}
		});
	});
};

/*
 * SUBMIT NEW TEXT, PARSE IT
*/
User.prototype.submitText = function(data){
	// var content_nodoubles = data.content.replace(/\.+/g, '.');
	// var sentences = content_nodoubles.split(/[\.]/).map(x => x.trim() + '.');
	// var content = data.content.replace(/\n/g, ' |br| ')split(' ')this.cleanText(data.content).toLowerCase()
	var content = this.cleanText(data.content).toLowerCase().split(' ');

	let i = -1;
	let length = content.length;
	let set = new Set;
	let word;
	var content_clean = '';
	while(++i < length){
		word = content[i];
		if(!set.has(word)){
			set.add(word);
			content_clean += word + ' ';
			console.log('Nowy wyraz:', word);
		}
	}
	console.log('Dlugosc content_clean:', content_clean.length);
	content_clean = content_clean.trim();
	console.log('To sa wyrazy unikalne:', content_clean);

	var words = new Set(content_clean.split(/ /g));

	data.language = parseInt(data.language);
	data.words = content_clean.split(/ /g).length;
	data.words_unique = words.size;
	data.length = this.cleanText(content_clean).length;
	data.author = this.userID;
	data.source = data.source || '';

	database.query(SQL_QUERIES.submitText.dirty, [ data.title, data.content, data.language, data.words, data.words_unique, data.length, data.author, data.source ])
	.on('error', (error) => {
		console.log(error.message);
		this.unicast({ event: 'Text Submit Failed' });
	}).on('result', (row) => {
		data.insertedID = row.insertId;
		var language = data.language;
		content_clean.split(' ').map(clean => {
			this.query(SQL_QUERIES.insertWord, [ clean, language ]);
		});
		console.log('Dlugosc content_clean:', content_clean.length);
		this.query(SQL_QUERIES.submitText.clean, [ row.insertId, content_clean ])
		.on('end', () => {
			this.unicast({
				event: 'Text Submit Success',
				success: true
			});
		});
	});
};

/*
 * WORD MANAGEMENT
*/
User.prototype.wordState = function(data){
	var state = data.state;
	var word = data.word;
	console.log('To jest string:', SQL_QUERIES.wordState[state]);
	this.query(SQL_QUERIES.wordState[state], [this.userID, word, this.languageFrom])
	.on('end', () => {  });
}
User.prototype.addTranslation = function(data){
	var from, to;
	console.log('jest addTranslation');
	database.query(SQL_QUERIES.wordExists, [ data.from, this.languageFrom ])
	.on('result', (row) => {
		if(row.id > 0){
			from = row.id;
		}
	}).on('end', () => { // word exists, can proceed
		console.log('To jest from:', from);
		if(! (from > 0)){
			console.log('Word "from" does not exist.');
			return; //word doesn't even exist in the database.
		}
		console.log('Bedzie insert:', data.to, this.languageTo);
		database.query(SQL_QUERIES.insertWord, [ data.to, this.languageTo ])
		.on('error', (error) => { console.log(error.message) })
		.on('end', () => {
			console.log('Moze i byl error ale jedziem dalej! Wiśta wio!!!');
			database.query(SQL_QUERIES.wordExists, [ data.to, this.languageTo ])
			.on('result', (row) => {
				var to = row.id;
				if(! (to > 0)){
					console.log('Could not insert "to" word.');
					return; //couldn't for some reason put the other word in the database.
				}
				database.query(SQL_QUERIES.addTranslation, [ from, to, this.userID ])
				.on('error', (error) => { console.log(error.message) })
				.on('result', (row) => {
					if(row.affectedRows === 1){
						// this.getTranslation(data.from);
						console.log('Add translation: success!');
						this.unicast({
							event: 'Translation Added',
							translation: [ data.to ]
						});
					} else {
						console.log(row);
						console.log('Could not add translation for some reason.');
					}
				});
			});
		});
	});
};
User.prototype.getTranslation = function(data){
	// console.log('getTransaltion:', this);
	var event = !!data.find? 'Translation Found' : 'Translation Got';
	var limit = !!data.find? '' : 'LIMIT 5';
	if(this.languageFrom === this.languageTo){
		this.unicast({
			event: event,
			translation: [ data.from ]
		});
		return;
	}
	var box = [];
	console.log(this.replace(SQL_QUERIES.getTranslation, { limit }));
	this.query(this.replace(SQL_QUERIES.getTranslation, { limit }), [ data.from, this.languageFrom, this.languageTo ])
	.on('result', (row) => {
		box.push(row.content);
	}).on('end', () => {
		this.unicast({
			event: event,
			translation: box
		});
	});
};

/*
 * RETRIEVE TEXT + CLEAN CONTENT
*/
User.prototype.getTitles = function(data){
	var what = data.what;
	var how = data.how;
	var contains;
	if(data.contains['constructor'] === String){
		contains = data.contains;
	} else contains = '';
	var box = [];
	console.log(this.replace(SQL_QUERIES.getTitles, { contains, how, what }));
	database.query(this.replace(SQL_QUERIES.getTitles, { contains, how, what }), [this.languageFrom])
	.on('result', (row) => {
		box.push({
			id: row.id,
			title: row.title,
			words: row.words,
			words_unique: row.words_unique,
			length: row.length,
			language: row.language,
			author: row.author
		});
	}).on('end', () => {
		console.log('bedzie unicast:', box);
		this.unicast({
			event: 'titles',
			data: box
		});
	});
};
User.prototype.pullText = function(data){
	var id = data.id;
	database.query(SQL_QUERIES.pullText, [ id ])
	.on('result', (row) => {
		console.log('jest pulledText');
		this.unicast({
			event: 'pulledText',
			title: row.title,
			content: row.content,
			content_clean: row.content_clean,
			source: row.source,
			words: row.words,
			words_unique: row.words_unique,
			language: row.language
		});
	});
};

/*
 * PASSWORD
*/
User.prototype.changePassword = function(data){ // na razie nie ma w ogole uzytkownikow ani kont wiec nieistotne
	database.query(SQL_QUERIES.changePassword, [data.password, this.userID])
	.on('end', () => {
		console.log(this.login, 'zmienil(a) haslo.');
	});
};

/*
 * SOME UTILS
*/
User.prototype.REGEXP = /[0-9\/»«\:;'"„“”\[\]\{\}~<>\|\!@#\$%\^&\*\)\(\+\=\.,_—–\-\?×ˈ\/]/g;
User.prototype.REGEXP_STRING = "[0-9\\/»«\\:;'\"„“”\\]\\[\\{\\}~<>\\|\\!@#\\$%\\^&\\*\\(\\)\\+\\=\\.,_—–\\-\\?×ˈ\\/]";
User.prototype.toUpperCase = function(string){
	return string[0].toUpperCase() + string.slice(1);
};
User.prototype.cleanText = function(string){
	return (string || '').replace(/\.([^0-9])/g, '. $1')
		.replace(/\s+/g, ' ')
		.replace(this.REGEXP, '') //bez /
		.replace(new RegExp(User.prototype.specialStrings, 'g'), '')
		.replace(/ +/g, ' ')
		.trim();
};
User.prototype.specialStrings = '°C';
User.prototype.replace = function(string, config){
	var i;
	for(i in config){
		if(config.hasOwnProperty(i)){
			string = string.replace(':' + i, config[i]);
		}
	}
	return string;
};