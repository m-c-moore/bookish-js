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

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
			'secretOrKey' : 'our_secret',
			'issuer' : 'accounts.examplesoft.com',
			'audience' : 'yoursite.net',
			'usernameField': 'username',
			'passwordField': 'password'};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get('/booksearch/', async (request, response) => {
//app.get('/booksearch/', passport.authenticate('jwt'), async (request, response) => {

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
