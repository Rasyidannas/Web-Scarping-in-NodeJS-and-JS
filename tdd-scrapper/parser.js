const cheerio = require("cheerio");

exports.listings = (html) => {
  const $ = cheerio.load(html);
  return $(".cl-static-search-result")
    .map((index, element) => {
      const titleElement = $(element).find(".title");
      const title = titleElement.text();
      const url = $(element).find("a").attr("href");
      return { title, url };
    })
    .get();
};
