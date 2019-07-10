/*import express from 'express';
const app = express();
const port = 3000;*/
import {IMain, IDatabase} from 'pg-promise';
import pgPromise from 'pg-promise';

const connectionString: string = 'postgres://bookish:bookish@localhost:5432/Bookish';
const pgp: IMain               = pgPromise({});
const db: IDatabase<any>       = pgp(connectionString);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pg = require('pg');
const parseDbUrl = require('parse-database-url');
 
const pool = new pg.Pool(parseDbUrl(process.env.DATABASE_URL))
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
})
 
const postgresLocal = require('passport-local-postgres')(pool);


passport.use(new LocalStrategy(postgresLocal.localStrategy));
passport.serializeUser(postgresLocal.serializeUser);
passport.deserializeUser(postgresLocal.deserializeUser);



/*
import Queries from './Queries/Queries';
import BookQueries from './Queries/BookQueries';
import TransactionQueries from './Queries/TransactionQueries'
import CopyQueries from './Queries/CopyQueries';

const queries   = new Queries(db);
const bookQuery = new BookQueries(db);
const copyQuery = new CopyQueries(db);
const transactionQuery = new TransactionQueries(db);

const runner = async () => {
    const Promise1 = transactionQuery.getBookAvailability(101);
    //const Promise2 = bookQuery.getBookByTitle('Clean');

    bookQuery.printBooks(await Promise1);
    //bookQuery.printBooks(await Promise2);
}

runner()
//transactionQuery.getCurrentUserBooks(1);
//console.log(result);
*/