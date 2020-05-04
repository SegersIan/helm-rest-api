const { run } = require('../helm');

module.exports = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/plain');
        const releaseName = "";
        const chart = "";
        const versionInfo = await run(`install --output json --atomic ${releaseName} ${chart}`);
        res.send(versionInfo.stdOut);
    } catch (error) {
        console.error(error);
    }
}