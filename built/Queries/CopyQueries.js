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
import OCopy from '../Models/Objection/OCopy';
export default class CopyQueries extends Queries {
    constructor() {
        super();
        this.getBookDetails = (copyID) => __awaiter(this, void 0, void 0, function* () {
            const copy = yield this.objectionQuery('id', copyID);
            const bookQuery = new BookQueries();
            const book = bookQuery.getBookDetails(copy[0].bookid);
            return book;
        });
        this.getAllCopies = (bookID) => __awaiter(this, void 0, void 0, function* () {
            const copyRequestArray = yield this.objectionQuery('bookid', bookID);
            const copyIDArray = copyRequestArray.map(copy => copy.id);
            return copyIDArray;
        });
        this.model = OCopy;
    }
}
