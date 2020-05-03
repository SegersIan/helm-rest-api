const express = require('express');
const app = express();
const configuration = require('./configuration');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(configuration.server.port, () => `${configuration.name} listening on port ${configuration.server.port}`)