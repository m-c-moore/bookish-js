import Queries from './Queries'
import Book from '../Models/Book';
import OBook from '../Models/Objection/OBook';

export default class BookQueries extends Queries {

    constructor() {
        super();
        this.model = OBook;
    }

    getBookDetails = async (bookID) => {
        const bookRequest: any    = await this.objectionQuery('id', bookID);
        const book: Book = new Book(bookRequest[0].id,
                                    bookRequest[0].title,
                                    bookRequest[0].author,
                                    bookRequest[0].isbn,
                                    bookRequest[0].embedref);
        return book;
    }

    getBooks = (bookArrayRequest) => {      
        const bookArray: Book[] = [];

        for (let bookR of bookArrayRequest) {
            const book: Book = new Book(bookR.id,
                                        bookR.title,
                                        bookR.author,
                                        bookR.isbn,
                                        bookR.embedref);

            bookArray.push(book);
        }
        bookArray.sort((a, b) => a.title.localeCompare(b.title));
        return bookArray;
    }

    getAllBooks = async () => {
        const bookArrayRequest: any[] = await this.model.query();
        return this.getBooks(bookArrayRequest); //didn't need awaits because last line in function
    }

    getBookByTitle = async (title) => {
        const bookArrayRequest: any[] = await this.objectionQuery('title', title, false);
        return this.getBooks(bookArrayRequest);
    }

    getBookByAuthor = async (author) => {
        const bookArrayRequest: any[] = await this.objectionQuery('author', author, false);
        return await this.getBooks(bookArrayRequest);
    }

    printBooks (bookArray) {
        console.log(bookArray);
    }
}