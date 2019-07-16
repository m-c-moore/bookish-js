var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Queries {
    constructor() {
        this.objectionQuery = (column, value, exact = true) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (exact) {
                    const result = yield this.model.query().where(column, value);
                    return result;
                }
                else {
                    const result = yield this.model.query().where(column, 'ilike', `%${value}%`);
                    return result;
                }
            }
            catch (e) {
                console.log(`====Model: ${this.model.name}, Column: ${column}, Value: ${value}====`);
                console.log(e.message);
            }
        });
        this.objectionFullQuery = (conditionArray) => __awaiter(this, void 0, void 0, function* () {
            let queryString = 'this.model.query()';
            try {
                for (let condition of conditionArray) {
                    if (condition.value === 'NULL') {
                        queryString += `.whereNull('${condition.column}')`;
                    }
                    else {
                        queryString += `.where('${condition.column}', '${condition.operator}', '${condition.value}')`;
                    }
                }
                const result = yield eval(queryString);
                return result;
            }
            catch (e) {
                console.log(`====Query string: ${queryString}====`);
                console.log(e.message);
            }
        });
        this.model = undefined;
    }
}
