import Queries from './Queries'
import Book from '../Models/Book';
import CopyQueries from './CopyQueries';

import OTransaction from '../Models/Objection/OTransaction';


export default class TransactionQueries extends Queries {
    constructor() {
        super();
        this.model = OTransaction;
    }
    
    getCurrentUserBooks = async (userID) => {
        const conditionsArray = [{'column':'userid', 'operator':'=', 'value':userID},
                                 {'column':'datereturned', 'operator':'=', 'value':'NULL'}];

        const currentUserTransaction: any[] = await this.objectionFullQuery(conditionsArray);

        const bookArray: any[] = [];
        const copyQuery: any   = new CopyQueries();

        for (let transaction of currentUserTransaction) {
            let book: Book = await copyQuery.getBookDetails(transaction.copyid);

            bookArray.push({'Book':book, 'Due date':transaction.duedate});
        }
        return bookArray;
    }

    getBookAvailability = async (bookID) => {
        const copyQuery: any        = new CopyQueries();
        const copyIDArray: number[] = await copyQuery.getAllCopies(bookID);
        
        let countAvailable: number    = copyIDArray.length;
        const arrayUnavailable: any[] = [];

        for (let copyID of copyIDArray) {
            const conditionsArray = [{'column':'copyid', 'operator':'=', 'value':copyID},
                                     {'column':'datereturned', 'operator':'=', 'value':'NULL'}];
            try {
                const currentUserTransaction: any = await this.objectionFullQuery(conditionsArray);
                arrayUnavailable.push({'userID':currentUserTransaction[0].userid,
                                       'dueDate':currentUserTransaction[0].duedate});
                countAvailable --;                  
            } catch (e) {
                console.log(e.message);
                continue; // need to suppress error
            }        
        }

        return {'numberAvailable':countAvailable,
                'arrayUnavailable':arrayUnavailable};
    }
}