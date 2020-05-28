const {run} = require('../helm');

module.exports = async (req, res) => {
    try {
        const output = await run('list --output json');
        const releases = JSON.parse(output.stdOut);
        res.setHeader('Content-Type', 'text/plain');
        //res.send(JSON.stringify(releases, null, 4));

        const kc = await getKubeConfig();
        res.send(kc);

    } catch (error) {
        console.error(error);
        res.send(error.toString());
    }
}

async function getKubeConfig() {
    return "";
}
