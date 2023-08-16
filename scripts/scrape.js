import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as cheerio from "cheerio";

const tableSelector = "table";

const URL =
  "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/reference/web-service-error-codes";

(async () => {
  const response = await fetch(URL);
  const htmlBody = await response.text();
  const $ = cheerio.load(htmlBody);
  const table = $(tableSelector).first();
  const results = [];
  table.find("tr").each((row, element) => {
    let code;
    let msg;
    let name;
    if (row === 0) {
      return;
    }
    $(element)
      .find("td")
      .each((idx, elem) => {
        if (idx === 0) {
          // error code
          code = $(elem).find("code").first().text().trim();
        }
        if (idx === 1) {
          // name and msg
          name = $(elem).find("strong").first().text().trim();
          msg = $(elem).find("code").first().text().trim();
        }
      });
    results.push({ code, name, msg });
  });

  const byCode = results.reduce((acc, cur) => {
    acc[cur.code] = {name: cur.name, message: cur.msg}
    return acc;
  }, {});

  fs.writeFileSync(
    path.join(__dirname, "../src/data/errorCodes.json"),
    JSON.stringify(byCode, null, 2)
  );
})();
