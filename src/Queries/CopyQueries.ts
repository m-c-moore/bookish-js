import Queries from './Queries'
import Copy from '../Models/Copy';
import Book from '../Models/Book';
import BookQueries from './BookQueries';


export default class CopyQueries extends Queries {
    constructor(db) {
        super(db);
    }
    
    getBookDetails = async (copyID) => {
        const queryString: string = this.makeSelectString('COPIES', 'bookid', `id = ${copyID}`);
        const bookID: any         = await this.makeQuery(queryString, true);
        
        const bookQuery : any = new BookQueries(this.db);
        const book: Book      = bookQuery.getBookDetails(bookID.bookid);

        return book;
    }

    getAllCopies = async (bookID) => {
        const queryString: string     = this.makeSelectString('COPIES', 'id', `bookid = ${bookID}`);
        const copyRequestArray: any[] = await this.makeQuery(queryString);
        
        const copyIDArray: any[] = copyRequestArray.map(copy => copy.id)
        
        return copyIDArray;
    }
}