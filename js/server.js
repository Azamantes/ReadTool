'use strict';

const Global = new Map;
const Userlist = new Set;
const SQL_QUERIES = require('./sql_queries.js');

const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({
	port: 8090
});
const database = require('mysql').createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'readtool',
	multipleStatements: true
});

(function GET_LANGUAGES(){
	var box = [];

	database.connect();
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
User.prototype.database = database;
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
	console.log('Database error (expected) :: [' + error.message + ']');
};
User.prototype.query = function(sql, argv){
	return this.database.query(sql, argv || [])
	.on('error', this.errorQuery);
};

/*
 * CONNECTION
*/
User.prototype.identity = function(){
	return '[' + this.userID + ']', this.login;
};
User.prototype.connect = function(data){
	if(!!this.userID){
		return console.log('Someone tried to impersonate user', this.userID);
	}

	var userID = data.userID;

	database.query(SQL_QUERIES.connect, [userID])
	.on('result', (row) => {
		this.userID = row.id;
		this.login = row.login;
		this.languageFrom = row.language_from;
		this.languageTo = row.language_to;
		Userlist.add(this);
	}).on('end', () => {
		if(!this.userID){
			return this.socket.disconnect();
		}
		this.unicast({ event: 'connected.' });
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
		Array.from(this.languages.keys()).map(language => this.getMyWords(language));
	});
};
User.prototype.getMyWords = function(language){
	if(!language) return;

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
User.prototype.disconnect = function(){
	Userlist.delete(this);
	this.socket.close();
};
User.prototype.unicast = function(data){
	if(!data){
		return console.log('User.prototype.unicast :: no data given.');
	}
	this.socket.send(JSON.stringify(data));
}

/*
 * CHANGE LANGUAGE FROM / TO
*/
User.prototype.changeLanguageFrom = function(data){
	if(!data){
		return console.log('User.prototype.changeLanguageFrom :: no data given.');
	}

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
	if(!data){
		return console.log('User.prototype.changeLanguageTo :: no data given.');
	}

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
	if(!data){
		return console.log('User.prototype.submitText :: no data given.');
	}

	var content = this.cleanText(data.content).toLowerCase().split(' '),
		i = -1,
		length = content.length,
		set = new Set,
		word,
		content_clean = '',
		words;

	while(++i < length){
		word = content[i];
		if(!set.has(word)){
			set.add(word);
			content_clean += word + ' ';
		}
	}
	content_clean = content_clean.trim();
	words = new Set(content_clean.split(/ /g));

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
		this.query(SQL_QUERIES.submitText.clean, [ row.insertId, content_clean ])
		.on('end', () => {
			this.unicast({ event: 'Text Submit Success', success: true });
		});
	});
};

/*
 * WORD MANAGEMENT
*/
User.prototype.wordState = function(data){
	if(!data){
		return console.log('User.prototype.wordState :: no data given.');
	}

	var state = data.state;
	var word = data.word;
	
	this.query(SQL_QUERIES.wordState[state], [this.userID, word, this.languageFrom]);
}
User.prototype.addTranslation = function(data){
	if(!data){
		return console.log('User.prototype.addTranslation :: no data given.');
	}

	var from, to;

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
		database.query(SQL_QUERIES.insertWord, [ data.to, this.languageTo ])
		.on('error', (error) => { console.log(error.message) })
		.on('end', () => {
			console.log('Maybe there was an error but let\'s proceed.');
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
						console.log('Add translation: success!');
						this.unicast({
							event: 'Translation Added',
							translation: [ data.to ]
						});
					} else {
						console.log('Could not add translation for some reason.');
					}
				});
			});
		});
	});
};
User.prototype.getTranslation = function(data){
	if(!data){
		return console.log('User.prototype.getTranslation :: no data given.');
	}

	var event = !!data.find? 'Translation Found' : 'Translation Got';
	var limit = !!data.find? '' : 'LIMIT 5';
	var box = [];

	if(this.languageFrom === this.languageTo){
		return this.unicast({ event: event, translation: [ data.from ] });
	}

	this.query(this.replace(SQL_QUERIES.getTranslation, { limit }), [ data.from, this.languageFrom, this.languageTo ])
	.on('result', (row) => {
		box.push(row.content);
	}).on('end', () => {
		this.unicast({ event: event, translation: box });
	});
};

/*
 * RETRIEVE TEXT + CLEAN CONTENT
*/
User.prototype.getTitles = function(data){
	if(!data){
		return console.log('User.prototype.getTitles :: no data given.');
	}

	var what = data.what;
	var how = data.how;
	var contains;
	var box = [];
	
	contains = data.contains['constructor'] === String? data.contains : '';

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
		this.unicast({ event: 'titles', data: box });
	});
};
User.prototype.pullText = function(data){
	if(!data){
		return console.log('User.prototype.pullText :: no data given.');
	}

	var id = data.id;

	database.query(SQL_QUERIES.pullText, [ id ])
	.on('result', (row) => {
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
User.prototype.changePassword = function(data){
	if(!data){
		return console.log('User.prototype.changePassword :: no data given.');
	}
	database.query(SQL_QUERIES.changePassword, [data.password, this.userID])
	.on('end', () => {
		console.log(this.login, 'changed password.');
	});
};

/*
 * SOME UTILS
*/
User.prototype.REGEXP = /[0-9\/»«\:;'"„“”\[\]\{\}~<>\|\!@#\$%\^&\*\)\(\+\=\.,_—–\-\?×ˈ\/]/g; // JSON.stringify() makes this an empty object, hence need for the REGEXP_STRING
User.prototype.REGEXP_STRING = "[0-9\\/»«\\:;'\"„“”\\]\\[\\{\\}~<>\\|\\!@#\\$%\\^&\\*\\(\\)\\+\\=\\.,_—–\\-\\?×ˈ\\/]";
User.prototype.toUpperCase = function(string){
	return !string? '' : string[0].toUpperCase() + string.slice(1);
};
User.prototype.cleanText = function(string){
	return !string? '' : (string || '').replace(/\.([^0-9])/g, '. $1')
		.replace(/\s+/g, ' ')
		.replace(this.REGEXP, '') //without /
		.replace(new RegExp(User.prototype.specialStrings, 'g'), '')
		.replace(/ +/g, ' ')
		.trim();
};
User.prototype.specialStrings = '°C';
User.prototype.replace = function(string, config){
	if(!string || !config){
		console.log('User.prototype.replace :: no data given.');
	}

	var i;

	for(i in config){
		if(config.hasOwnProperty(i)){
			string = string.replace(':' + i, config[i]);
		}
	}
	return string;
};