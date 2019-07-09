export default class Transaction {
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