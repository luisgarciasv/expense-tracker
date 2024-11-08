import { CustomError } from './helpers.js';
import { AddExpense } from './methods/add.js';
import { ListExpense } from './methods/list.js';
import { UpdateExpense } from './methods/update.js';
import { DeleteExpense } from './methods/delete.js';
import { SummaryExpense } from './methods/summary.js';
import { usage } from './methods/usage.js';

function methodHandler({ method, ...options }) {
    return new Promise((resolve, reject) => {
        if (!method) {
            reject(
                new CustomError(
                    'MissingArgumentError',
                    'No arguments added to the command.',
                ),
            );
        }

        switch (method) {
            case 'add':
                resolve(new AddExpense(options).create().updateDB());
                break;
            case 'update':
                resolve(new UpdateExpense(options).create().updateDB());
                break;
            case 'delete':
                resolve(new DeleteExpense(options).create().updateDB());
                break;
            case 'list':
                resolve(new ListExpense(options).listDB());
                break;
            case 'summary':
                resolve(new SummaryExpense(options).summaryDB());
                break;
            case 'usage':
                resolve(usage());
                break;
            default:
                reject(
                    new CustomError(
                        'ExpectedArgumentsError',
                        `Command ${method} not found. Try the 'usage' command for more info.`,
                    ),
                );
        }
    });
}

export { methodHandler };
