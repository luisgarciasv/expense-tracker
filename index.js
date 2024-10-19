import  { argv } from 'node:process'
import  fs  from 'node:fs/promises'
import { argsParser } from './lib/args-parser.js'
import { error } from 'node:console'

const args = argv.slice(2) 

argsParser(args)
    .then( res => console.log(res))
    .catch(error => console.warn(error))

