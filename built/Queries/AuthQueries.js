var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Queries from './Queries';
import OUser from '../Models/Objection/OUser';
export default class AuthQueries extends Queries {
    constructor() {
        super();
        this.getPasswordFromUserName = (username) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.objectionQuery('username', username);
                const password = user[0].password;
                return password;
            }
            catch (e) {
                console.log(e.message);
                return undefined;
            }
        });
        this.validateCredentials = (username, password) => __awaiter(this, void 0, void 0, function* () {
            const correctPassword = yield this.getPasswordFromUserName(username);
            if (password === correctPassword) {
                return true;
            }
            return false;
        });
        this.model = OUser;
    }
}
