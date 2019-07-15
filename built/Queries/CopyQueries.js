var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
let Copy = class Copy extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Copy.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Copy.prototype, "bookid", void 0);
Copy = __decorate([
    Entity()
], Copy);
export { Copy };
export default class CopyQueries extends Queries {
    constructor(connection) {
        super(connection);
        this.getBookDetails = (copyID) => __awaiter(this, void 0, void 0, function* () {
            const copy = new Copy();
            const queryString = this.makeSelectString('COPIES', 'bookid', `id = ${copyID}`);
            const bookID = yield this.typeORMQuery(copy, 'COPIES', 'bookid', `id = ${copyID}`, true);
            const bookQuery = new BookQueries(this.connection);
            const book = bookQuery.getBookDetails(bookID.bookid);
            return book;
        });
        this.getAllCopies = (bookID) => __awaiter(this, void 0, void 0, function* () {
            const copy = new Copy();
            const queryString = this.makeSelectString('COPIES', 'id', `bookid = ${bookID}`);
            const copyRequestArray = yield this.typeORMQuery(copy, 'COPIES', 'copies.id', `bookid = ${bookID}`);
            return copyRequestArray;
            const copyIDArray = copyRequestArray.map(copy => copy.id);
            return copyIDArray;
        });
    }
}
