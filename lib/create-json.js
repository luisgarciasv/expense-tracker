import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { existsSync } from 'node:fs';

function generatePath() {
    return join(cwd(), 'expenses.json');
}

function jsonExists() {
    return existsSync(generatePath());
}

function createJSON(args) {
    return new Promise((resolve, reject) => {
        try {
            if (jsonExists()) {
                resolve({ args });
            }

            writeFileSync(generatePath(), JSON.stringify([]));
            resolve({ text: 'expeneses.json created succesfully', args });
        } catch (error) {
            reject(error);
        }
    });
}

export { createJSON };
