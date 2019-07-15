var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Queries from './Queries';
import Book from '../Models/Book';
export default class BookQueries extends Queries {
    constructor(connection) {
        super(connection);
        this.getBookDetails = (bookID) => __awaiter(this, void 0, void 0, function* () {
            const queryString = this.makeSelectString('BOOK', '*', `id = ${bookID}`);
            const bookRequest = yield this.makeQuery(queryString, true);
            const book = new Book(bookRequest.id, bookRequest.title, bookRequest.author, bookRequest.isbn);
            //console.log(book);
            return book;
        });
        this.getBooks = (queryString) => __awaiter(this, void 0, void 0, function* () {
            const bookArrayRequest = yield this.makeQuery(queryString);
            const bookArray = [];
            for (let bookR of bookArrayRequest) {
                const book = new Book(bookR.id, bookR.title, bookR.author, bookR.isbn);
                bookArray.push(book);
            }
            bookArray.sort((a, b) => a.title.localeCompare(b.title));
            return bookArray;
        });
        this.getAllBooks = () => __awaiter(this, void 0, void 0, function* () {
            const queryString = this.makeSelectString('BOOK', '*', 'id IS NOT NULL');
            return this.getBooks(queryString); //didn't need awaits because last line in function
        });
        this.getBookByTitle = (title) => __awaiter(this, void 0, void 0, function* () {
            const queryString = this.makeSelectString('BOOK', '*', `title LIKE '%${title}%'`);
            return this.getBooks(queryString);
        });
        //repositry name versus query and making a repositries directory
        this.getBookByAuthor = (author) => __awaiter(this, void 0, void 0, function* () {
            const queryString = this.makeSelectString('BOOK', '*', `author LIKE '%${author}%'`);
            return yield this.getBooks(queryString);
        });
    }
    printBooks(bookArray) {
        console.log(bookArray);
    }
}
