import { CustomError } from './helpers.js';
import { AddExpense } from './methods/add.js';
import { ListExpense } from './methods/list.js';

function methodHandler({ method, ...options }) {
    return new Promise((resolve, reject) => {
        if (!method) {
            reject(
                new CustomError(
                    'MissingArgumentError',
                    'No arguments added to the command',
                ),
            );
        }

        switch (method) {
            case 'add':
                resolve(new AddExpense(options).create().updateDB());
                break;
            case 'update':
                console.log('not yet implemented');
                break;
            case 'delete':
                console.log('not yet implemented');
                break;
            case 'list':
                resolve(new ListExpense(options).listDB());
                break;
            case 'summary':
                console.log('not yet implemented');
                break;
            default:
                console.log('usage() ... note yet implemented');
        }
    });
}

export { methodHandler };
