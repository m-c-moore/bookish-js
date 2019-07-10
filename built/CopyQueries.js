var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Queries from './Queries';
import BookQueries from './BookQueries';
export default class CopyQueries extends Queries {
    constructor(db) {
        super(db);
        this.getBookDetails = (copyID) => __awaiter(this, void 0, void 0, function* () {
            const queryString = this.makeSelectString('COPIES', 'bookid', `id = ${copyID}`);
            const bookID = yield this.makeQuery(queryString, true);
            const bookQuery = new BookQueries(this.db);
            const book = bookQuery.getBookDetails(bookID.bookid);
            return book;
        });
        this.getAllCopies = (bookID) => __awaiter(this, void 0, void 0, function* () {
            const queryString = this.makeSelectString('COPIES', 'id', `bookid = ${bookID}`);
            const copyRequestArray = yield this.makeQuery(queryString);
            const copyIDArray = copyRequestArray.map(copy => copy.id);
            return copyIDArray;
        });
    }
}
