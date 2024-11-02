import { dbOperationsMixin, testArgsMixin } from '../helpers.js';

class DeleteExpense {
    constructor(args) {
        Object.assign(this, testArgsMixin);
        const { valid, error } = this.testArgs(this.dict, args);
        if (!valid) throw error;
        this.args = args;
        Object.assign(this, dbOperationsMixin);
    }

    dict = {
        id: {
            required: true,
            value: 123,
        },
    };

    create() {
        this.dbData = {
            ...this.args,
            updatedAt: new Date().toString(),
            isDeleted: true,
        };
        return this;
    }
}

export { DeleteExpense };
