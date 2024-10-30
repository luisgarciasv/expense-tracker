function optionTest(str) {
    return str.startsWith('--');
}

function numberTest(str) {
    if (!isNaN(str)) {
        return Number(str);
    }
    return str;
}

function argsParser(arr) {
    return new Promise((resolve, reject) => {
        try {
            let options = {};

            const args = ['method', ...arr]
                .map((elem) => optionTest(elem) ? elem.slice(2) : elem);

            for (let i = 0; i < args.length; i += 2) {
                options = {
                    ...options,
                    [args[i]]: numberTest(args[i + 1]),
                };
            }
            // compareObj(createDict, options);
            resolve(options);
        } catch (error) {
            reject(error);
        }
    });
}
export { argsParser };
