const { start } = require('./create-server.js');
const port = process.env.PORT || 8000;

start({ port }).then(() => {
  console.info(`Project is running at http://localhost:${port}`);
});
