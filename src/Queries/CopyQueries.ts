import Queries from './Queries'
//import Copy from '../Models/Copy';
import Book from '../Models/Book';
import BookQueries from './BookQueries';

import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity()
export class Copy extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bookid: number;

}



export default class CopyQueries extends Queries {
    constructor(connection) {
        super(connection);
    }
    


    getBookDetails = async (copyID) => {
        const copy = new Copy();
        const queryString: string = this.makeSelectString('COPIES', 'bookid', `id = ${copyID}`);
        const bookID: any         = await this.typeORMQuery(copy,'COPIES', 'bookid', `id = ${copyID}`, true);
        
        const bookQuery : any = new BookQueries(this.connection);
        const book: Book      = bookQuery.getBookDetails(bookID.bookid);

        return book;
    }

    getAllCopies = async (bookID) => {
        const copy = new Copy();
        const queryString: string     = this.makeSelectString('COPIES', 'id', `bookid = ${bookID}`);
        const copyRequestArray: any = await this.typeORMQuery(copy,'COPIES', 'copies.id', `bookid = ${bookID}`);
        return copyRequestArray;
        
        const copyIDArray: any[] = copyRequestArray.map(copy => copy.id)
        
        return copyIDArray;
    }
}