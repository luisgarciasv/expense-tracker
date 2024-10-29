import { writeFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { generatePath } from './helpers.js';

function jsonExists() {
    return existsSync(generatePath());
}

function createJSON(args) {
    return new Promise((resolve, reject) => {
        try {
            if (jsonExists()) {
                resolve({ args });
            } else {
                writeFileSync(generatePath(), JSON.stringify([]));
                resolve({ text: 'expenses.json created successfully', args });
            }
        } catch (error) {
            reject(error);
        }
    });
}

export { createJSON };
