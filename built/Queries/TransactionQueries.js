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
import OTransaction from '../Models/Objection/OTransaction';
export default class TransactionQueries extends Queries {
    constructor() {
        super();
        this.getCurrentUserBooks = (userID) => __awaiter(this, void 0, void 0, function* () {
            const conditionsArray = [{ 'column': 'userid', 'operator': '=', 'value': userID },
                { 'column': 'datereturned', 'operator': '=', 'value': 'NULL' }];
            const currentUserTransaction = yield this.objectionFullQuery(conditionsArray);
            const bookArray = [];
            const copyQuery = new CopyQueries();
            for (let transaction of currentUserTransaction) {
                let book = yield copyQuery.getBookDetails(transaction.copyid);
                bookArray.push({ 'Book': book, 'Due date': transaction.duedate });
            }
            return bookArray;
        });
        this.getBookAvailability = (bookID) => __awaiter(this, void 0, void 0, function* () {
            const copyQuery = new CopyQueries();
            const copyIDArray = yield copyQuery.getAllCopies(bookID);
            let countAvailable = copyIDArray.length;
            const arrayUnavailable = [];
            for (let copyID of copyIDArray) {
                const conditionsArray = [{ 'column': 'copyid', 'operator': '=', 'value': copyID },
                    { 'column': 'datereturned', 'operator': '=', 'value': 'NULL' }];
                try {
                    const currentUserTransaction = yield this.objectionFullQuery(conditionsArray);
                    arrayUnavailable.push({ 'userID': currentUserTransaction[0].userid,
                        'dueDate': currentUserTransaction[0].duedate });
                    countAvailable--;
                }
                catch (e) {
                    console.log(e.message);
                    continue; // need to suppress error
                }
            }
            return { 'numberAvailable': countAvailable,
                'arrayUnavailable': arrayUnavailable };
        });
        this.model = OTransaction;
    }
}
