const { run } = require('../helm');

module.exports = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/plain');
        const versionInfo = await run('version');
        res.send(versionInfo.stdOut);
    } catch (error) {
        console.error(error);
    }
}