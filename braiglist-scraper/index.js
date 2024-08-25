const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
  const jobIndexPage = await axios.get("https://braigslist.vercel.app/jobs/1/");
  console.log(jobIndexPage.data);
}

main();
