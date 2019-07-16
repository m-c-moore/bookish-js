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
import OBook from '../Models/Objection/OBook';
export default class BookQueries extends Queries {
    constructor() {
        super();
        this.getBookDetails = (bookID) => __awaiter(this, void 0, void 0, function* () {
            const bookRequest = yield this.objectionQuery('id', bookID);
            const book = new Book(bookRequest[0].id, bookRequest[0].title, bookRequest[0].author, bookRequest[0].isbn, bookRequest[0].embedref);
            return book;
        });
        this.getBooks = (bookArrayRequest) => {
            const bookArray = [];
            for (let bookR of bookArrayRequest) {
                const book = new Book(bookR.id, bookR.title, bookR.author, bookR.isbn, bookR.embedref);
                bookArray.push(book);
            }
            bookArray.sort((a, b) => a.title.localeCompare(b.title));
            return bookArray;
        };
        this.getAllBooks = () => __awaiter(this, void 0, void 0, function* () {
            const bookArrayRequest = yield this.model.query();
            return this.getBooks(bookArrayRequest); //didn't need awaits because last line in function
        });
        this.getBookByTitle = (title) => __awaiter(this, void 0, void 0, function* () {
            const bookArrayRequest = yield this.objectionQuery('title', title, false);
            return this.getBooks(bookArrayRequest);
        });
        this.getBookByAuthor = (author) => __awaiter(this, void 0, void 0, function* () {
            const bookArrayRequest = yield this.objectionQuery('author', author, false);
            return yield this.getBooks(bookArrayRequest);
        });
        this.model = OBook;
    }
    printBooks(bookArray) {
        console.log(bookArray);
    }
}
