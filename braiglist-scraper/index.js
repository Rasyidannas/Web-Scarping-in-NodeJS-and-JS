const axios = require("axios");
const cheerio = require("cheerio");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrapeJobsFromIndexPages() {
  const allJobs = [];
  for (let i = 1; i < 14; i++) {
    const jobIndexPage = await axios.get(
      `https://braigslist.vercel.app/jobs/${i}/`
    );
    console.log("Request fired: " + i);
    await sleep(1000);
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
  //   console.log(allJobs.length);
  return allJobs;
}

async function scrapeJobDescriptions(allJobs) {
  let allJobsWithDescriptions = [];
  for (const job of allJobs) {
    const jobDescriptionPage = await axios.get(
      "https://braigslist.vercel.app/" + job.url
    );
    console.log("Request fired: " + job.url);
    await sleep(1000);
    const $ = cheerio.load(jobDescriptionPage.data);
    const description = $("div").text();
    job.description = description;
    allJobsWithDescriptions.push(job);
  }
}

async function main() {
  const allJobs = await scrapeJobsFromIndexPages();
  scrapeJobDescriptions(allJobs);
}

main();
