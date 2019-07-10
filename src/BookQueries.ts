import Queries from './Queries'
import Book from './Book';

export default class BookQueries extends Queries {

    constructor(db) {
        super(db);
    }

    getBookDetails = async (bookID) => {
        const queryString: string = this.makeSelectString('BOOK', '*', `id = ${bookID}`);
        const bookRequest: any    = await this.makeQuery(queryString, true);

        const book: Book = new Book(bookRequest.id,
                                    bookRequest.title,
                                    bookRequest.author,
                                    bookRequest.isbn);

        //console.log(book);
        return book;
    }
    getBooks = async (queryString) => {
        const bookArrayRequest: any[] = await this.makeQuery(queryString);
        
        const bookArray: Book[] = [];

        for (let bookR of bookArrayRequest) {
            const book: Book = new Book(bookR.id,
                                        bookR.title,
                                        bookR.author,
                                        bookR.isbn);

            bookArray.push(book);
        }
        bookArray.sort((a, b) => a.title.localeCompare(b.title));

        return bookArray;
    }

    getAllBooks = async () => {
        const queryString: string = this.makeSelectString('BOOK', '*', 'id IS NOT NULL');
        return await this.getBooks(queryString);
    }

    getBookByTitle = async (title) => {
        const queryString: string = this.makeSelectString('BOOK', '*', `title LIKE '%${title}%'`);
        return await this.getBooks(queryString);
    }

    getBookByAuthor = async (author) => {
        const queryString: string = this.makeSelectString('BOOK', '*', `author LIKE '%${author}%'`);
        return await this.getBooks(queryString);
    }

    printBooks (bookArray) {
        console.log(bookArray);
    }
}