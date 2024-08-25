const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
  const jobIndexPage = await axios.get("https://braigslist.vercel.app/jobs/1/");
  // console.log(jobIndexPage.data);
  const $ = cheerio.load(jobIndexPage.data);
  const jobs = $(".title-blob > a")
    .map((index, element) => {
      const tittle = $(element).text();
      const url = $(element).attr("href");
      return { tittle, url };
    })
    .get();
  console.log(jobs);
}

main();
