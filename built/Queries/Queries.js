var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Queries {
    constructor(db) {
        this.makeQuery = (queryString, singleItem = false) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                if (singleItem) {
                    data = yield this.db.one(queryString);
                }
                else {
                    data = yield this.db.any(queryString);
                }
                return data;
            }
            catch (e) {
                console.log(`====${queryString}===`);
                console.log(e);
            }
        });
        this.awaitQuery = (queryString, singleItem = false) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.makeQuery(queryString, singleItem);
            console.log(result);
            return result;
        });
        this.db = db;
    }
    makeSelectString(table, value, condition) {
        const queryString = `SELECT ${value} FROM ${table} WHERE ${condition};`;
        return queryString;
    }
}
