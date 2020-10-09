const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();

app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')));

let server;

module.exports = {
  start: ({ port }) => {
    return new Promise((resolve) => {
      server = app.listen(port, () => {
        resolve();
      });
    });
  },
  stop: () => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  }
};
