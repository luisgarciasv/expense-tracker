import { dbOperationsMixin, testArgsMixin } from '../helpers.js';

class ListExpense {
    constructor(args) {
        Object.assign(this, testArgsMixin);

        const { valid, error } = this.testArgs(this.dict, args);

        if (!valid) {
            throw error;
        }

        this.args = args;
        Object.assign(this, dbOperationsMixin);
    }

    dict = {
        category: {
            required: false,
            value: 'string',
        },
    };
}

export { ListExpense };
