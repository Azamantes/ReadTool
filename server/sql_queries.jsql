module.exports = {
	connect: "SELECT id, login, language_from, language_to, color1, color2 FROM users WHERE id = ? AND status = 1;",
	changeLanguageFrom: "UPDATE users SET language_from = (SELECT id FROM languages WHERE name = ?) WHERE id = ?;",
	changeLanguageTo: "UPDATE users SET language_to = (SELECT id FROM languages WHERE name = ?) WHERE id = ?;",
	submitText: {
		dirty: "INSERT INTO texts(`title`, `content`, `language`, `words`, `words_unique`, `length`, `author`, `source`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		clean: "INSERT INTO texts_clean(id, content) VALUES (?, ?);"
	},
	changePassword: "UPDATE users SET password = ? WHERE id = ?;",
	setColor1: "UPDATE users SET color1 = ? WHERE id = ?;",
	setColor2: "UPDATE users SET color2 = ? WHERE id = ?;",
	getColor1: "SELECT color1 FROM users WHERE id = ?;",
	getColor2: "SELECT color2 FROM users WHERE id = ?;",
	getTitles: "SELECT t.id, t.title, t.words, t.words_unique, t.length, u.login author, l.name language FROM texts t, languages l, users u WHERE t.author = u.id AND l.id = t.language AND l.id = ? AND t.language = u.language_from AND t.title LIKE '%:contains%' ORDER BY t.:what :how;",
	pullText: "SELECT t.id, t.title, t.content, t.words, t.words_unique, t.source, t.language, tc.content content_clean FROM texts t, texts_clean tc WHERE t.id = tc.id AND t.id = ?;",
	wordState: {
		true: "INSERT INTO users_words(user, word) SELECT ?, w.id FROM words w WHERE w.content = ? AND w.language = ?;",
		false: "DELETE FROM users_words WHERE user = ? AND word = (SELECT w.id FROM words w WHERE w.content = ? AND w.language = ?);"
	},
	insertWord: "INSERT INTO words(content, language) VALUES (?, ?);",
	wordExists: "SELECT id FROM words WHERE content = ? AND language = ?;",
	addTranslation: "INSERT INTO words_dictionary(word_from, word_to, author) VALUES (?, ?, ?);",
	getTranslation: "SELECT w2.content FROM words w1, words w2, words_dictionary wd WHERE wd.word_from = w1.id AND w1.content = ? AND w1.language = ? AND wd.word_to = w2.id AND w2.language = ? :limit;"
}