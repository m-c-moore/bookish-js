import Queries from './Queries'

export default class QueriesFromCopy extends Queries {
    constructor(copy) {
        this.copyID = copy.id;
    }

    getBook() {
        db.one('SELECT $1 AS value', 123)
            .then(function (data) {
                console.log('DATA:', data.value)
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            })
        return 'book using copy id';
    }

    getTransactions() {
        return 'list of transactions from copy id';
    }

    getAvailability() {
        return 'status (out / available)';
    }
}