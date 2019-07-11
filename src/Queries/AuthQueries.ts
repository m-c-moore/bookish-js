import Queries from './Queries'

export default class AuthQueries extends Queries {

    constructor(db) {
        super(db);
    }

    getPasswordFromUserName = async (username) => {
        const queryString: string = this.makeSelectString('LIBRARY_USER', 'password', `username = '${username}'`);
        try {
            const password: any = await this.makeQuery(queryString, true);
            return password.password;
        } catch (e) {
            console.log(e.message);
            return undefined;
        }
    }

    validateCredentials = async (username, password) => {
        const correctPassword :string = await this.getPasswordFromUserName(username);
        console.log(correctPassword);
        
        if (password === correctPassword) {
            return true;
        }
        return false;
    }
}