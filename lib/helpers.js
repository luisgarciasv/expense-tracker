import { join } from 'node:path';
import { cwd } from 'node:process';
import { readFile as readFilePromise, writeFile as writeFilePromise } from 'node:fs/promises';
import { AddExpense } from './methods/add.js';
import { UpdateExpense } from './methods/update.js';
import { DeleteExpense } from './methods/delete.js';

function generatePath() {
    return join(cwd(), 'expenses.json');
}

const dbOperationsMixin = {
    readDB() {
        return readFilePromise(generatePath())
            .then((data) => JSON.parse(data))
            .then((data) => data.filter(({ isDeleted }) => !isDeleted));
    },
    listDB() {
        const { category: listCat } = this.args;
        if (!listCat) {
            return this.readDB()
                .then((data) => {
                    // return data.map(({id, amount, description}) => {
                    //     return `ID: ${id} - Description: ${description} - amount: ${amount}`
                    // });
                    return data.reduce((acc, { id, amount, description, category }) => {
                        return `${acc}\nID: ${id} - Description: ${description} - Amount: ${amount}${
                            category ? ` - Category: ${category}` : ''
                        }`;
                    }, '');
                });
        } else {
            return this.readDB()
                .then((data) => {
                    return data.filter(({ category }) => category === listCat)
                        .reduce((acc, { id, amount, description, category }) => {
                            return `${acc}\nID: ${id} - Description: ${description} - Amount: ${amount} - Category: ${category}`;
                        }, '');
                })
                .then((data) => {
                    if (data.length === 0) return `No expenses with category '${listCat}' were found`;
                    // .map(({id, amount, description, category}) => {
                    //     return `ID: ${id} - Description: ${description} - amount: ${amount} - category: ${category}`;
                    // });
                    return data;
                });
        }
    },
    updateDB() {
        return this.readDB()
            .then((data) => {
                let expenseDescription;
                if (this instanceof AddExpense) {
                    const last = data.length ? data.slice(-1)[0].id : 0;
                    const newExpense = { id: last + 1, ...this.dbData };
                    expenseDescription = newExpense.description;
                    data.push(newExpense);
                }

                if (this instanceof UpdateExpense) {
                    const { id, description, amount, category, updatedAt } = this.dbData;
                    if (!description && !amount && !category) {
                        throw new CustomError(
                            'ExpectedArgumentsError',
                            `Expected at least 1 argument to update.`,
                        );
                    }
                    const position = id - 1;
                    const updateExpense = data.slice(position, position + 1)[0];
                    const newExpense = {
                        ...updateExpense,
                        description: description ?? updateExpense.description,
                        amount: amount ?? updateExpense.amount,
                        category: category ?? updateExpense.category,
                        updatedAt: updatedAt,
                    }
                    expenseDescription = updateExpense.description;
                    data.splice(position, 1, newExpense);
                }

                if (this instanceof DeleteExpense) {
                    //
                }

                try {
                    return writeFilePromise(generatePath(), JSON.stringify(data))
                        .then((_data) => {
                            if (this instanceof AddExpense) {
                                return `Expense '${expenseDescription}' added successfully.`;
                            }
                            if (this instanceof UpdateExpense) {
                                return `Expense '${expenseDescription}' updated successfully.`;
                            }
                            if (this instanceof DeleteExpense) {
                                return `Expense '${expenseDescription}' deleted successfully.`;
                            }
                        });
                } catch (err) {
                    throw new CustomError(
                        'WriteFileError',
                        'There was an error updating the expenses DB file',
                        { cause: err },
                    );
                }
            });
    },
};

const testArgsMixin = {
    testArgs(baseArgs, newArgs) {
        let valid = true;
        let error = undefined;
        const expectedMaxLength = Object.keys(baseArgs).length;
        const newArgsLength = Object.keys(newArgs).length;

        if (newArgsLength > expectedMaxLength) {
            valid = false;
            error = new CustomError(
                'ExpectedArgumentsError',
                `Too many arguments, expected ${expectedMaxLength} at most.`,
            );

            return { valid, error };
        }

        for (const prop in baseArgs) {
            if (baseArgs[prop].required && !newArgs[prop]) {
                valid = false;
                error = new CustomError(
                    'ExpectedArgumentsError',
                    `Missing argument: ${prop}`,
                );
                break;
            }

            if (newArgs[prop] && typeof baseArgs[prop].value !== typeof newArgs[prop]) {
                valid = false;
                error = new CustomError(
                    'ExpectedArgumentsError',
                    `Argument ${prop} must be a ${typeof baseArgs[prop].value}`,
                );
                break;
            }
        }

        for (const prop in newArgs) {
            if (!baseArgs[prop]) {
                valid = false;
                error = new CustomError(
                    'ExpectedArgumentsError',
                    `Unexpected argument: ${prop}`,
                );
                break;
            }
        }

        return { valid, error };
    },
};

class CustomError extends Error {
    constructor(name, message, options = {}) {
        super(message, options);
        this.name = name;
    }
}

export { CustomError, dbOperationsMixin, generatePath, testArgsMixin };
