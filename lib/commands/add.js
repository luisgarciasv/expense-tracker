import { testArgsMixin }  from "../helpers.js"

class AddExpense{
    constructor(args) {

        Object.assign(this, testArgsMixin);

        const { valid, error } = this.testArgs(this.dict, args)

        if (!valid) {
            throw error
        }

        this.args = args;
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
        }
    }

    create() {
        return {
            ...this.args,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            deleted: false,
        }
    }

}

export { AddExpense };
