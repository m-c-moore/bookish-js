var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')

const Queries     = require('./dist/Queries/Queries').default;
const PassportPG  = require('./dist/PassportPG').default;
const BookQueries = require('./dist/Queries/BookQueries').default;
const AuthQueries = require('./dist/Queries/AuthQueries').default;

var app = express();

const db = Queries.createDB()
const bookQuery = new BookQueries(db);
const authQuery = new AuthQueries(db);

app.get('/loginrequest/', async (request, response) => {

	const username = request.query.username;
	const password = request.query.password;
	let authenticated = false;
  
	try {
		authenticated = await authQuery.validateCredentials(username, password);
	}
	catch{
		response.sendStatus(404);
	}
	if (authenticated === true) {
		const token = PassportPG.generateToken(username, password);
		response.json({'token':token});
		console.log(token);
	}
	
});

app.get('/booksearch/', async (request, response) => {

	const searchType = request.query.type;
	const searchTerm = request.query.term;

	const bookJSON = {};
	let books;
	try {
		switch (searchType) {
			case "Title":
        		books = await bookQuery.getBookByTitle(searchTerm);
        		break;
			case "Author":
        		books = await bookQuery.getBookByAuthor(searchTerm);
        		break;
		}
		for (book of books) {
			bookJSON[book.id] = book;
		}
		response.json(bookJSON);
	}
	catch{
		response.sendStatus(404);
	}
});

//serve frontend directory
//app.use('/', require('./dist/Queries/Queries.js').default);
//app.use('/', require('./dist/Queries/UserQueries.js').default);
app.use(express.static('dist/frontend'));

passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
passport.authenticate('local', { successFlash: 'Welcome!' });

/*
passport.use(new Strategy(
	function(username, password, cb) {
		database.users.findByUsername(username, function(err, user) {
			if (err) { return cb(err); }
			if (!user) { return cb(null, false); }
			if (user.password != password) { return cb(null, false); }
			return cb(null, user);
		});
	}));

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	database.users.findById(id, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	});
});
*/


/*

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
*/
app.listen(3000, () => console.log(`Example app listening on port 3000!`))
