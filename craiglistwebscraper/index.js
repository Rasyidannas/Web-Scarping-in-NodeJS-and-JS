const puppeteer = require("puppeteer");

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
  await page.goto("https://www.google.com/");
}

main();
