var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')

const Queries     = require('./dist/Queries/Queries').default;
const PassportPG  = require('./dist/PassportPG').default;
const BookQueries = require('./dist/Queries/BookQueries').default;
const AuthQueries = require('./dist/Queries/AuthQueries').default;

var app = express();
app.use(passport.initialize());
app.use(passport.session());


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

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
			'secretOrKey' : 'our_secret',
			'usernameField': 'username',
			'passwordField': 'password'};

passport.use(new JwtStrategy(opts, async (user, done) => {
	try {
		const validCredentials = await authQuery.validateCredentials(user.username, user.password)
		if (validCredentials === true) {
			console.log('========Verified==========')
			return done(null, user);
		} else {
			return done(null, false);
		}
	} catch (e) {
		return done(e, false);
	}
}));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
	await authQuery.validateCredentials(username, function(err, user) {
		done(err, user);
	});
});

//app.get('/booksearch/', async (request, response) => {
app.get('/booksearch/', passport.authenticate('jwt'), async (request, response) => {

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

app.use(express.static('dist/frontend'));

passport.authenticate('jwt', { failureFlash: 'Invalid username or password.' });
passport.authenticate('jwt', { successFlash: 'Welcome!' });

app.listen(3000, () => console.log(`Example app listening on port 3000!`))
