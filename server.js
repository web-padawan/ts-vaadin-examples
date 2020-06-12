const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const port = process.env.PORT || 8000;

const app = express();

app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')))
app.listen(port);

console.info(`Project is running at http://localhost:${port}`);
