import Queries from './Queries'


export default class QueriesFromCopy extends Queries {
    baseURL: String;
    copyID: Number;

    constructor(copy) {
        super();
        this.copyID = copy.id;
    }
    
    getBook() {
        
        return 'book using copy id';
    }

    getTransactions() {
        return 'list of transactions from copy id';
    }

    getAvailability() {
        return 'status (out / available)';
    }
}