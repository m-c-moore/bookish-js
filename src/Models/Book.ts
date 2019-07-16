import Queries from '../Queries/Queries';

export default class Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    embedref: string;

    constructor(id, title, author, isbn, embedref) {
        this.id     = id;
        this.title  = title;
        this.author = author;
        this.isbn   = isbn;
        this.embedref = embedref;
    }

    static countAvailableCopies = async (bookID) => {
        console.log('... / ... copies available');
    }
}