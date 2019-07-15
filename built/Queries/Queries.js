var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import { createConnection } from "typeorm";
export default class Queries {
    constructor(connection) {
        this.makeQuery = (queryString, singleItem = false) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                if (singleItem) {
                    //data = await this.connection.one(queryString);
                }
                else {
                    //data = await this.connection.any(queryString);
                }
                return data;
            }
            catch (e) {
                console.log(`====${queryString}===`);
                console.log(e);
            }
        });
        this.typeORMQuery = (Copy, table, value, condition, singleItem = false) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection.getRepository('copies')
                    .createQueryBuilder('copies')
                    .select(); //'copies.id')
                //.from(Copy, 'copies.id');
                //.where('copies.bookid = :bookid',{bookid: 101})
                //.getMany();
                //.from(Copy, table);
                // .where(condition)
                // .getMany();
                if (singleItem) {
                    return result.getOne();
                }
                else {
                    return result; //.getMany();
                }
            }
            catch (e) {
                console.log(`====${this.makeSelectString(Copy, value, condition)}====`);
                console.log(e.message);
            }
        });
        this.connection = connection;
    }
    /*awaitQuery = async (queryString, singleItem = false) => {
        const Model = this.sequelize.Model;
        const
        
        const result : any = await this.makeQuery(queryString, singleItem);
        console.log(result);
        return result;
    }*/
    makeSelectString(table, value, condition) {
        const queryString = `SELECT ${value} FROM ${table} WHERE ${condition};`;
        return queryString;
    }
}
Queries.createConnection = () => __awaiter(this, void 0, void 0, function* () {
    const connectionString = 'postgres://bookish:bookish@localhost:5432/Bookish';
    const connection = yield createConnection({ type: 'postgres', url: connectionString });
    return connection;
});
