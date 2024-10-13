const cheerio = require("cheerio");

exports.listings = (html) => {
  const $ = cheerio.load(html);
  return $(".cl-static-search-result")
    .map((index, element) => {
      const title = $(element).find(".title").text();
      return { title };
    })
    .get();
};
