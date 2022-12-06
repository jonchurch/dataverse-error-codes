import cheerio from "cheerio";
import got from "got";

const tableSelector =
  "#main > div.content > div.table-wrapper.has-inner-focus > table";

const URL =
  "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/reference/web-service-error-codes";

(async () => {
  const data = await got.get(URL);
  console.log(data);
})();
