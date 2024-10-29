import { CustomError } from './helpers.js';
import {AddExpense} from "./commands/add.js";


function methodHandler({ method, ...options }) {
    return new Promise((resolve, reject) => {
        if (!method) {
            reject(
                new CustomError(
                    'MissingArgumentError',
                    'No arguments added to the command!',
                ),
            );
        }
        try {
            const obj = new AddExpense(options).create()
            resolve(obj)
        } catch (err) {
            reject(err);
        }

    });
}

export { methodHandler };
