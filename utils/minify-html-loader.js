const { minifyHTMLLiterals, defaultShouldMinify } = require('minify-html-literals');

function minifyLiterals(source, map) {
  let result = false;
  // Do not minify HTML in demo snippets
  if (!this.resourcePath.includes('demo')) {
    const minify = minifyHTMLLiterals(source, {
      fileName: this.resourcePath,
      shouldMinify(template) {
        return (
          defaultShouldMinify(template) ||
          template.parts.some((part) => {
            // Matches Polymer templates that are not tagged
            return part.text.includes('<style');
          })
        );
      }
    });
    if (minify && minify.code) {
      this.callback(null, minify.code, minify.map);
      result = true;
    }
  }
  if (!result) {
    this.callback(null, source, map);
  }
  return undefined;
}

module.exports = minifyLiterals;
