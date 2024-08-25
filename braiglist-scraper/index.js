const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeJobsFromIndexPages() {
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
  //   console.log(allJobs.length);
  return allJobs;
}

async function scrapeJobDescriptions(allJobs) {
  const allJobsWithDescriptionsPromises = allJobs.map(async (job) => {
    const jobDescriptionPage = await axios.get(
      "https://braigslist.vercel.app/" + job.url
    );
    const $ = cheerio.load(jobDescriptionPage.data);
    const description = $("div").text();
    console.log(description);
    job.description = description;
    return job;
  });
  const allJobsDescriptions = await Promise.all(
    allJobsWithDescriptionsPromises
  );
  console.log(allJobsDescriptions);
}

async function main() {
  const allJobs = await scrapeJobsFromIndexPages();
  scrapeJobDescriptions(allJobs);
}

main();
