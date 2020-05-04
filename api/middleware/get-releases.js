const { run } = require('../helm');

module.exports = async (req, res) => {
    try {
        const output = await run('list --output json');
        const releases = JSON.parse(output.stdOut);
        res.setHeader('Content-Type', 'text/plain');
        res.send(JSON.stringify(releases, null, 4));
    } catch (error) {
        console.error(error);
    }
}