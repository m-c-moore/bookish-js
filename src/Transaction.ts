export default class Transaction {
    id: number;
    copyID: string;
    userID: string;
    dateBorrowed: Date;
    dateDue: Date;
    dateReturned: Date;

    constructor(id) {
        this.id = id;
    }

    recordBorrow(copy, user, dateBorrowed, dateDue) {
        this.copyID = copy.id;
        this.userID = user.id;
        
        this.dateBorrowed = dateBorrowed;
        this.dateDue      = dateDue;
    }

    recordReturn(dateReturned) {
        this.dateReturned = dateReturned;
    }
}