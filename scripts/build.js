import fs from 'fs'
import path from 'path'

import ALL_CODES from './data/errorCodes.json'

let namedExports = '';

for (const code of Object.keys(ALL_CODES)) {
  const { variableName } = ALL_CODES[code]
  // Generate named export
  namedExports += `export const ${variableName} = "${code}";\n`;
}

fs.writeFileSync(path.join(__dirname,'./index.js'), namedExports);
