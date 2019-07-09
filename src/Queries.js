const pgp = require('pg-promise')(/* options */)

export default class Queries {
    constructor() {
        this.db = pgp('postgres://username:password@host:port/database');
    }
}