const fs = require('fs');
const util = require('util');
const dot = require('dot');
const prism = require('prismjs');
const loadLanguages = require('prismjs/components/');

loadLanguages(['ts']);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);

Object.assign(dot.templateSettings, { strip: false });

function template(path) {
  return readFile(path).then((contents) => dot.template(contents.toString('utf-8')));
}

function parseView(name) {
  return readFile(`src/demos/${name}`)
    .then((code) => {
      const title = name.replace('.ts', '');
      const source = code.toString('utf-8');
      return { title, source };
    })

    .catch((err) => console.error(err.toString(), err.stack));
}

function addHelperFunctionsToContext(context) {
  return Object.assign({}, context, {
    highlightJS: (text) =>
      prism
        .highlight(text, prism.languages.typescript)
        .replace(/`/g, '\\`')
        .replace(/^\n*/, '')
        .replace(/\s*$/, '')
        .replace(/ {2}/g, '<span class="indent">&nbsp;&nbsp;</span>'),
    escape: (text) => text.replace(/\${/g, '\\${')
  });
}

function writeDemo(view) {
  const augmentedContext = addHelperFunctionsToContext(view);
  return template('demo.tpl.js')
    .then((tpl) => writeFile(`docs/${view.title}.demo.ts`, tpl(augmentedContext)))
    .then((_) => view)
    .catch((err) => console.log(err.toString(), err.stack));
}

function generateDocs() {
  return mkdir('docs')
    .catch((_) => {})
    .then((_) => readdir('src/demos'))
    .then((views) => Promise.all(views.map((view) => parseView(view).then(writeDemo))));
}

generateDocs();
