const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrappingResults = [
  {
    title:
      "Python / Django or Flask / HTMX / Postgresql / AWS Developer wanted",
    datePosted: new Date("2024-09-28 12:00:00"),
    neighborhood: "alameda",
    url: "https://sfbay.craigslist.org/eby/sof/d/alameda-python-django-or-flask-htmx/7788705484.html",
    jobDescription:
      "Help build software for an accounting firm. We primarily serve nonprofits, and our looking to build out our tooling to support both our business and our clients...",
    compensation: "$50,000 - $75,000 per year DOE",
  },
];

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://sfbay.craigslist.org/search/sof#search=1~thumb~0~0");

  const html = await page.content();
  const $ = cheerio.load(html);

  const results = $(".posting-title")
    .map((index, element) => {
      const title = $(element).text();
      const url = $(element).attr("href");
      return { title, url };
    })
    .get();

  console.log(results);
}

main();
