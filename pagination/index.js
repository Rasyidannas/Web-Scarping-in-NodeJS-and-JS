const request = require("request-promise");
const cheerio = require("cheerio");

async function scrape() {
  // https://sfbay.craigslist.org/search/act#search=1~list~1~0
  for (let index = 0; index <= 1; index++) {
    const html = await request.get(
      `https://sfbay.craigslist.org/search/act#search=1~list~${index}~0`
    );

    const $ = cheerio.load(html);
    $(".result-info").each((index, element) => {
      const titleElement = $(element).find(".posting-title");
      console.log($(titleElement).text());
    });
    console.log("At page number " + index);
  }
}

scrape();
