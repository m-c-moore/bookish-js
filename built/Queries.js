import pgPromise from 'pg-promise';
export default class Queries {
    constructor() {
        this.connectionString = 'postgres://bookish:bookish@localhost:51633/database';
        this.pgp = pgPromise({});
        this.db = this.pgp(this.connectionString);
    }
    makeQueryForOne(queryString) {
        this.db.one(queryString)
            .then(function (data) {
            console.log('====Success===');
            this.result = data.value;
        })
            .catch(function (error) {
            this.result = error;
        });
    }
    makeSelectString(table, value, condition) {
        const queryString = `SELECT ${value} FROM ${table} WHERE ${condition};`;
        return queryString;
    }
}
