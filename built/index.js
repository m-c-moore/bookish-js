var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pgPromise from 'pg-promise';
const connectionString = 'postgres://bookish:bookish@localhost:5432/Bookish';
const pgp = pgPromise({});
const db = pgp(connectionString);
import Queries from './Queries';
import BookQueries from './BookQueries';
import TransactionQueries from './TransactionQueries';
import CopyQueries from './CopyQueries';
const queries = new Queries(db);
const bookQuery = new BookQueries(db);
const copyQuery = new CopyQueries(db);
const transactionQuery = new TransactionQueries(db);
const runner = () => __awaiter(this, void 0, void 0, function* () {
    const Promise1 = transactionQuery.getBookAvailability(101);
    //const Promise2 = bookQuery.getBookByTitle('Clean');
    bookQuery.printBooks(yield Promise1);
    //bookQuery.printBooks(await Promise2);
});
runner();
//transactionQuery.getCurrentUserBooks(1);
//console.log(result);
