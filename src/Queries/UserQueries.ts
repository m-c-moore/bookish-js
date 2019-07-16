import Queries from './Queries'
import OUser from '../Models/Objection/OUser';

export default class UserQueries extends Queries {

    constructor() {
        super();
        this.model = OUser;
    }

    getAllUsers = async () => {
        const users: any[] = await this.model.query();
        return users;
    }
}