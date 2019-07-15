import "reflect-metadata";
import {IMain, IDatabase} from 'pg-promise';
import pgPromise from 'pg-promise';
import {createConnection, Connection, getRepository} from "typeorm";
import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";
import {Copy} from './CopyQueries';


export default class Queries {
    connection: Connection;

    constructor(connection) {
        this.connection = connection;
    }

    static createConnection = async () => {
        const connectionString: string = 'postgres://bookish:bookish@localhost:5432/Bookish';
        const connection: Connection = await createConnection({type: 'postgres', url: connectionString});
        return connection;
    }

    makeQuery = async (queryString, singleItem = false) => {
        try {
            let data : any;
            if (singleItem) {
                //data = await this.connection.one(queryString);
            } else {
                //data = await this.connection.any(queryString);
            }
            return data;
        
        } catch (e) {
            console.log(`====${queryString}===`);
            console.log(e);
        }
    }

    typeORMQuery = async (Copy, table, value, condition, singleItem = false) => {
        try {
            const result: any = await this.connection.getRepository('copies')
                                                        .createQueryBuilder('copies')
                                                        .select();//'copies.id')
                                                        //.from(Copy, 'copies.id');
                                                        //.where('copies.bookid = :bookid',{bookid: 101})
                                                        //.getMany();
                                                        //.from(Copy, table);
                                                        // .where(condition)
                                                        // .getMany();
            if (singleItem) {
                return result.getOne();
            } else {
                return result;//.getMany();
            }
        } catch(e) {
            console.log(`====${this.makeSelectString(Copy, value, condition)}====`);
            console.log(e.message);
        }
    }

    /*awaitQuery = async (queryString, singleItem = false) => {
        const Model = this.sequelize.Model;
        const 
        
        const result : any = await this.makeQuery(queryString, singleItem);
        console.log(result);
        return result;
    }*/

    makeSelectString(table, value, condition) {
        const queryString: string = `SELECT ${value} FROM ${table} WHERE ${condition};`;
        return queryString;
    }

    
}