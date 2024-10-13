const parser = require("../parser");
const fs = require("fs");
let html;
let listings;

beforeAll(() => {
  html = fs.readFileSync("./test.html");
  listings = parser.listings(html);
});

it("should give the correct number of listings", () => {
  expect(listings.length).toBe(352);
});

it("should get hood from listing", () => {
  expect(listings[0].hood).toBe("berkeley");
});

it("should get correct date from listing", () => {
  expect(listings[0].datePosted).toEqual(new Date("Sun Oct 13 2024 11:21:50"));
});

it("should get correct url", () => {
  expect(listings[0].url).toBe(
    "https://sfbay.craigslist.org/eby/muc/d/berkeley-excellent-piano-teacher/7787196212.html"
  );
});

it("should get correct title", () => {
  expect(listings[0].title).toBe("Excellent Piano Teacher--Teaching Online!");
});
