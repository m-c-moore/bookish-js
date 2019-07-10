var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Queries from './Queries';
import CopyQueries from './CopyQueries';
export default class TransactionQueries extends Queries {
    constructor(db) {
        super(db);
        this.getCurrentUserBooks = (userID) => __awaiter(this, void 0, void 0, function* () {
            const queryString = this.makeSelectString('TRANSACTIONS', '*', `userid = ${userID} AND datereturned IS NULL`);
            const currentUserTransaction = yield this.makeQuery(queryString);
            const bookArray = [];
            const copyQuery = new CopyQueries(this.db);
            for (let transaction of currentUserTransaction) {
                let book = yield copyQuery.getBookDetails(transaction.copyid);
                bookArray.push({ 'Book': book,
                    'Due date': transaction.duedate });
            }
            console.log(bookArray);
            return bookArray;
        });
        this.getBookAvailability = (bookID) => __awaiter(this, void 0, void 0, function* () {
            const copyQuery = new CopyQueries(this.db);
            const copyIDArray = yield copyQuery.getAllCopies(bookID);
            let countAvailable = copyIDArray.length;
            const arrayUnavailable = [];
            for (let copyID of copyIDArray) {
                const queryString = this.makeSelectString('TRANSACTIONS', '*', `copyid = ${copyID} AND datereturned IS NULL`);
                try {
                    const currentUserTransaction = yield this.makeQuery(queryString, true);
                    arrayUnavailable.push({ 'userID': currentUserTransaction.userid,
                        'dueDate': currentUserTransaction.duedate });
                    countAvailable--;
                }
                catch (e) {
                    continue; // need to suppress error
                }
            }
            return { 'numberAvailable': countAvailable,
                'arrayUnavailable': arrayUnavailable };
        });
    }
}
