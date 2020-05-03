const { exec } = require('child_process');

module.exports = {
    run : runHelm
}

async function runHelm(args) {
    return new Promise(function promiseHandler(resolve, reject) {
        exec(`helm ${args}`, function callback(err, stdOut, stdErr) {
            if (err) {
                return reject(err);
            }
            return resolve({ stdOut, stdErr });
        })
    })
}