const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pg = require('pg');
const parseDbUrl = require('parse-database-url');
const pool = new pg.Pool(parseDbUrl(process.env.DATABASE_URL));
pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});
const postgresLocal = require('passport-local-postgres')(pool);
passport.use(new LocalStrategy(postgresLocal.localStrategy));
passport.serializeUser(postgresLocal.serializeUser);
passport.deserializeUser(postgresLocal.deserializeUser);
