const fs = require('fs')
const path = require('path')

const FLAT_ERROR_DATA = require('./flat.json')

module.exports = function flatGen() {
  let namedExports = '';

  for (const [code, variableName] of Object.entries(FLAT_ERROR_DATA)) {
    // Generate named export
    namedExports += `export const ${variableName} = "${code}";\n`;
  }

  fs.writeFileSync(path.join(__dirname,'./index.js'), namedExports);
}
