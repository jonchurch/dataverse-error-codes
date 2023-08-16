const fs = require('fs')
const path = require('path')

const ALL_CODES = require('./data/errorCodes.json')

function flatGen() {
  let namedExports = '';

  for (const code of Object.keys(ALL_CODES)) {
    const { variableName } = ALL_CODES[code]
    // Generate named export
    namedExports += `export const ${variableName} = "${code}";\n`;
  }

  fs.writeFileSync(path.join(__dirname,'./lib.js'), namedExports);
}

flatGen()
