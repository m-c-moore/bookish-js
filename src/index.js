import express from 'express';
const app = express();
const port = 3000;

import Book from './Book';
import User from './User';
import Copy from './Copy';
import Transaction from './Transaction';

book = new Book('book1');
user = new User('user2');
copy = new Copy('copy3');
transaction = new Transaction('t4');