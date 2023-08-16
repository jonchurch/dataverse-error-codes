const fs = require("fs");
const path = require("path");

const cheerio = require("cheerio");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

  const flat = results.reduce((acc, cur) => {
    acc[cur.code] = cur.name
    return acc
  }, {})

  fs.writeFileSync(
    path.join(__dirname, "errorCodes.json"),
    JSON.stringify(byCode, null, 2)
  );
  fs.writeFileSync(
    path.join(__dirname, "flat.json"),
    JSON.stringify(flat, null, 2)
  )
})();
