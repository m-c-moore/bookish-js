import Transaction from './Transaction';
export default class Copy {
    constructor(id, book) {
        this.id = id;
        this.bookID = book.id;
    }
    borrowCopy(user, dateBorrowed, dateDue) {
        const transaction = new Transaction('NEED ID');
        transaction.recordBorrow(this, user, dateBorrowed, dateDue);
        return transaction;
    }
    returnCopy(previousTransaction, dateReturned) {
        previousTransaction.recordReturn(dateReturned);
        return previousTransaction;
    }
    getCopyHistory() {
        console.log('user.name, dateBorrowed, dateReturned, dateDue');
    }
    getBookInfo() {
        console.log('title, author');
    }
}
