/*import express from 'express';
const app = express();
const port = 3000;*/
import Queries from './Queries';
/*
const book = new Book(123, 'title', 'author', 'isbn');
const user = new User(678,'uname','matt','mypassword');
const copy = new Copy(456, book);
const transaction = new Transaction(999);
transaction.recordBorrow(copy, user, new Date('11/15/2018'), new Date('12/14/2019'));

console.log(book, user, copy, transaction);
*/
const queries = new Queries();
const queryString = queries.makeSelectString('LIBRARY_USER', 'username', "password = 'qwerty'");
console.log(queryString);
const result = queries.makeQueryForOne(queryString);
console.log(queries);
