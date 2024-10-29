import { join } from 'node:path';
import { cwd } from 'node:process';
import { readFile as readFilePromise } from 'node:fs/promises';

function generatePath() {
    return join(cwd(), 'expenses.json');
}

function readDB() {
    return readFilePromise(generatePath())
        .then((data) => JSON.parse(data));
}

function filterDeleted() {
    return readDB()
        .then((data) => data.filter(({ isDeleted }) => !isDeleted));
}

const testArgsMixin = {
    testArgs(baseArgs, newArgs) {

        let valid = true;
        let error = undefined;
        const expectedMaxLength = Object.keys(baseArgs).length
        const newArgsLength = Object.keys(newArgs).length

        if( newArgsLength > expectedMaxLength ) {

            valid = false
            error = new CustomError(
                'ExpectedArgumentsError',
                `Too many arguments, expected ${expectedMaxLength} at most.`
            )

            return {valid, error}
        }

        for (const prop in baseArgs) {

                if(baseArgs[prop].required && !newArgs[prop]) {
                    valid = false
                    error = new CustomError(
                        'ExpectedArgumentsError',
                        `Missing argument: ${prop}`
                    )
                    break
                }
                
                if(newArgs[prop] && typeof baseArgs[prop].value !== typeof newArgs[prop]) {
                    valid = false
                    error = new CustomError(
                        'ExpectedArgumentsError',
                        `Argument ${prop} must be a ${typeof baseArgs[prop].value}`
                    )
                    break
                }
            }

        for (const prop in newArgs) {
            if(!baseArgs[prop]) {
                valid = false;
                error = new CustomError(
                    'ExpectedArgumentsError',
                    `Unexpected argument: ${prop}`
                )

            }
        }

        return {valid, error};
    }
}

class CustomError extends Error {
    constructor(name, message, options= {}) {
        super(message, options);
        this.name = name;
    }
}

export { testArgsMixin, CustomError, filterDeleted, generatePath, readDB };
