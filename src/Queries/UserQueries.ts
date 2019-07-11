import Queries from './Queries'
import Book from '../Models/Book';

export default class UserQueries extends Queries {

    constructor(db) {
        super(db);
    }

    

    getAllUsers = async () => {
        const queryString: string = this.makeSelectString('LIBRARY_USER', '*', `id IS NOT NULL`);
        const users: any[] = await this.makeQuery(queryString);
        return users;
    }
}