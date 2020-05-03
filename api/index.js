const express = require('express');

const app = express();
const configuration = require('./configuration');
const middleware = require('./middleware');

app.get('/', middleware.getVersion);
app.get('/version', middleware.getVersion);
app.get('/list', middleware.getReleases);

app.listen(configuration.server.port, () => `${configuration.name} listening on port ${configuration.server.port}`)