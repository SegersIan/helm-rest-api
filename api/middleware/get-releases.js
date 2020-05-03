const { run } = require('../helm');

module.exports = async (req, res) => {
    try {
        const output = await run('list');
        if (output.stdErr) {
            throw new Error(output.stdErr);
        }

        const lines = output.stdOut.split('\n');
        const header = lines.shift();
        const fields = header.split('\t');

        const releases = lines.reduce((all, row) => {
            const values = row.split('\t');
            if (values.length === fields.length) {
                all.push(fields.reduce((acc, key, index) => ({ ...acc, [sanitizeField(key)]: sanitizeValue(values[index]) }), {}))
            }
            return all;
        }, [])

        res.setHeader('Content-Type', 'text/plain');
        res.send(JSON.stringify(releases, null, 4));

    } catch (error) {
        console.error(error);
    }
}

function sanitizeField(field) {
    return field.toLowerCase().trim().replace(/\s/g, "_");
}

function sanitizeValue(value) {
    if (typeof value === "string") {
        return value.trim();
    }
    return value;
}