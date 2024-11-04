const request = require("request-promise").defaults({ jar: true });
const fs = require("fs");

async function main() {
  try {
    const html = await request.post("https://accounts.craigslist.org/login", {
      form: {
        inputEmailHandle: "rasshit.dsgn@gmail.com",
        inputPassword: "Anikhariyati72@",
      },
      headers: {
        Referer: "https://accounts.craigslist.org/login",
      },
      simple: false,
      followAllRedirects: true,
    });
    fs.writeFileSync("./login.html", html);

    const draftHtml = await request.get(
      "https://accounts.craigslist.org/login/home?show_tab=drafts"
    );
    fs.writeFileSync("./drafts.html", draftHtml);
  } catch (error) {
    console.error(error);
  }
}

main();
