import { argv } from 'node:process';
import { argsParser } from './lib/args-parser.js';
import { createJSON } from './lib/create-json.js';
import { methodHandler } from './lib/method-handler.js';
import { CustomError } from './lib/helpers.js';

const args = argv.slice(2);

createJSON(args)
    .then(({ text, args }) => {
        if (text) console.log(text);
        return args;
    })
    .then((args) => argsParser(args))
    .then((parsedArgs) => methodHandler(parsedArgs))
    .then((res) => console.log(res))
    .catch((err) => {
        if (err instanceof CustomError) {
            console.warn(`${err.name}: ${err.message}`);
            if (err.cause) console.warn(err.cause);
        } else {
            console.error(err);
        }
    });