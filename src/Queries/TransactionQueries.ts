import Queries from './Queries'
import Transaction from '../Models/Transaction';
import Copy from '../Models/Copy';
import Book from '../Models/Book';
import CopyQueries from './CopyQueries';


export default class TransactionQueries extends Queries {
    constructor(db) {
        super(db);
    }
    
    getCurrentUserBooks = async (userID) => {
        const queryString: string       = this.makeSelectString('TRANSACTIONS', '*', `userid = ${userID} AND datereturned IS NULL`);
        const currentUserTransaction: any[] = await this.makeQuery(queryString);
        const bookArray: any[] = [];
        const copyQuery: any    = new CopyQueries(this.db);

        for (let transaction of currentUserTransaction) {
            let book: Book = await copyQuery.getBookDetails(transaction.copyid);

            bookArray.push({'Book':book,
                            'Due date':transaction.duedate});
        }
        console.log(bookArray);
        return bookArray;
    }

    getBookAvailability = async (bookID) => {
        const copyQuery: any        = new CopyQueries(this.db)
        const copyIDArray: number[] = await copyQuery.getAllCopies(bookID)
        
        let countAvailable: number  = copyIDArray.length;
        const arrayUnavailable: any[] = [];

        for (let copyID of copyIDArray) {
            const queryString: string       = this.makeSelectString('TRANSACTIONS', '*', `copyid = ${copyID} AND datereturned IS NULL`);
            try {
                const currentUserTransaction: any = await this.makeQuery(queryString, true);
                arrayUnavailable.push({'userID':currentUserTransaction.userid,
                                       'dueDate':currentUserTransaction.duedate});
                countAvailable --;                  
            } catch (e) {
                continue; // need to suppress error
            }        
        }

        return {'numberAvailable':countAvailable,
                'arrayUnavailable':arrayUnavailable};
    }
}