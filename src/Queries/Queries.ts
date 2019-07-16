export default class Queries {
    model: any;
    
    constructor() {
        this.model = undefined;
    }

    objectionQuery = async (column, value, exact = true) => {
        try {
            if (exact) {
                const result = await this.model.query().where(column, value);
                return result;
            } else {
                const result = await this.model.query().where(column, 'ilike', `%${value}%`);
                return result;
            }
        } catch(e) {
            console.log(`====Model: ${this.model.name}, Column: ${column}, Value: ${value}====`);
            console.log(e.message);
        }
    }

    objectionFullQuery = async (conditionArray) => {
        let queryString = 'this.model.query()';
        try {
            for (let condition of conditionArray) {
                if (condition.value === 'NULL') {
                    queryString += `.whereNull('${condition.column}')`;
                } else {
                    queryString += `.where('${condition.column}', '${condition.operator}', '${condition.value}')`;
                }
            }
            const result = await eval(queryString);
            return result;
        } catch(e) {
            console.log(`====Query string: ${queryString}====`);
            console.log(e.message);
        }
    }
}