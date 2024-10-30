import { dbOperationsMixin, testArgsMixin } from '../helpers.js';

class AddExpense {
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
        description: {
            required: true,
            value: 'string',
        },
        amount: {
            required: true,
            value: 123,
        },
        category: {
            required: false,
            value: 'string',
        },
    };

    create() {
        this.dbData = {
            ...this.args,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            isDeleted: false,
        };
        return this;
    }
}

export { AddExpense };
