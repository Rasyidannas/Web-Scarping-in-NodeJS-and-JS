const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function main() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://accounts.craigslist.org/login");
    await page.type("input#inputEmailHandle", "rasshit.dsgn@gmail.com");
    await page.type("input#inputPassword", "Anikhariyati72@");
    await page.click("button#login");
    await page.goto(
      "https://accounts.craigslist.org/login/home?show_tab=drafts"
    );
    const content = await page.content();
    const $ = await cheerio.load(content);
    console.log($("body > article > section > fieldset").text());
  } catch (error) {
    console.error(error);
  }
}

main();
