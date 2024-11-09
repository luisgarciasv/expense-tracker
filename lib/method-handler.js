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
                    'No command added to the arguments, try the usage command to learn more about the app',
                ),
            );
        } else {
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
                            'UnkownMethodError',
                            `The command ${method} does not exists, try the usage command to learn more about the app`,
                        ),
                    );
            }
        }
    });
}

export { methodHandler };
