const {exec} = require('child_process');
const fs = require('fs');

module.exports = {
    run: runHelm,
    createKubeConfig: createKubeConfig
}

async function runHelm(args) {
    return new Promise(function promiseHandler(resolve, reject) {
        exec(`helm ${args}`, function callback(err, stdOut, stdErr) {
            if (err) {
                return reject(err);
            }
            return resolve({stdOut, stdErr});
        })
    })
}

async function createKubeConfig(fileName, yamlString) {
    return new Promise(function promiseHandler(resolve, reject) {
        fs.writeFile(`/app/api/temp/${fileName}`, Buffer.from(yamlString), err => {
            if (err) {
                return reject(err);
            }
            return resolve();
        })
    });
}
