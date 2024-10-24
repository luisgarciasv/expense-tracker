import { argv } from 'node:process';
import { argsParser } from './lib/args-parser.js';
import { createJSON } from './lib/create-json.js';

const args = argv.slice(2);

createJSON(args)
    .then(({ text, args }) => {
        if (text) console.log(text);
        return args;
    })
    .then((args) => argsParser(args))
    .then((res) => console.log(res))
    .catch((error) => console.log(error));

// argsParser(args)
//     .then((res) => console.log(res))
//     .catch((error) => console.warn(error));
