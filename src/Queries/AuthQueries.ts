import Queries from './Queries'
import OUser from '../Models/Objection/OUser';

export default class AuthQueries extends Queries {

    constructor() {
        super();
        this.model = OUser;
    }

    getPasswordFromUserName = async (username) => {
        try {
            const user: any = await this.objectionQuery('username', username);
            const password  = user[0].password;
            return password;
        } catch (e) {
            console.log(e.message);
            return undefined;
        }
    }

    validateCredentials = async (username, password) => {
        const correctPassword: string = await this.getPasswordFromUserName(username);      
        
        if (password === correctPassword) {
            return true;
        }
        return false;
    }
}