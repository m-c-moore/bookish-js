/*import express from 'express';
const app = express();
const port = 3000;*/
import {IMain, IDatabase} from 'pg-promise';
import pgPromise from 'pg-promise';

const connectionString: string = 'postgres://bookish:bookish@localhost:5432/Bookish';
const pgp: IMain               = pgPromise({});
const db: IDatabase<any>       = pgp(connectionString);





import Queries from './Queries';
import BookQueries from './BookQueries';
import TransactionQueries from './TransactionQueries'
import CopyQueries from './CopyQueries';

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
