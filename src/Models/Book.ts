import Queries from '../Queries/Queries';

export default class Book {
    id: number;
    title: string;
    author: string;
    isbn: string;

    constructor(id, title, author, isbn) {
        this.id     = id;
        this.title  = title;
        this.author = author;
        this.isbn   = isbn;
    }

    static countAvailableCopies = async (bookID) => {
        console.log('... / ... copies available');
    }
}