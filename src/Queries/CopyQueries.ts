import Queries from './Queries'
import Book from '../Models/Book';

import BookQueries from './BookQueries';
import OCopy from '../Models/Objection/OCopy';

export default class CopyQueries extends Queries {
    constructor() {
        super();
        this.model = OCopy;
    }
    
    getBookDetails = async (copyID) => {
        const copy: number = await this.objectionQuery('id', copyID);
        
        const bookQuery : any = new BookQueries();
        const book: Book      = bookQuery.getBookDetails(copy[0].bookid);

        return book;
    }

    getAllCopies = async (bookID) => {
        const copyRequestArray: any[] = await this.objectionQuery('bookid', bookID);      
        const copyIDArray:      any[] = copyRequestArray.map(copy => copy.id);
        
        return copyIDArray;
    }
}