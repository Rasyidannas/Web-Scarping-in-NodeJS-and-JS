const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
  const allJobs = [];
  for (let i = 1; i < 14; i++) {
    const jobIndexPage = await axios.get(
      `https://braigslist.vercel.app/jobs/${i}/`
    );
    // console.log(jobIndexPage.data);
    const $ = cheerio.load(jobIndexPage.data);
    const jobs = $(".title-blob > a")
      .map((index, element) => {
        const tittle = $(element).text();
        const url = $(element).attr("href");
        return { tittle, url };
      })
      .get();
    allJobs.push(...jobs);
  }
  console.log(allJobs.length);
}

main();
