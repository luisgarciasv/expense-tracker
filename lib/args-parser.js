function optionTest (str) {
    return str.startsWith('--')
}

function isEven (num) {
    return num % 2 === 0
}
 
const argsParser = (obj) => {

    return new Promise( (resolve, reject) => {

        let lastIsOption
        const options = {}
        
        const args = obj.map( e => {

            if(!isEven(obj.length)) reject('Options and values in wrong order')

            if (optionTest(e) && !lastIsOption ) {
                lastIsOption = true
                return e.slice(2)
            }
            if(!optionTest(e) && lastIsOption){
                lastIsOption = false
                return e
            }
            reject('Options and values in wrong order')
        })

        for (let i = 0; i < args.length; i+=2) {
            
            options[args[i]] = args[i+1]

        }

        resolve(options)
    })


}
export  { argsParser }
