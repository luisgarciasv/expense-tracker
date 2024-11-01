import { dbOperationsMixin, testArgsMixin } from '../helpers.js';

class UpdateExpense {
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
        id: {
            required: true,
            value: 123,
        },
        description: {
            required: false,
            value: 'string',
        },
        amount: {
            required: false,
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
            updatedAt: new Date().toString(),
        };
        return this;
    }
}

export { UpdateExpense };
