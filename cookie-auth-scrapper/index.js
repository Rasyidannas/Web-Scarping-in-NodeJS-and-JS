const request = require("request-promise").defaults({ jar: true });
const fs = require("fs");

async function main() {
  const result = await request.get("https://internshala.com/");
  const loginResult = await request.post(
    "https://internshala.com/login/verify_ajax/user",
    {
      form: {
        email: "unknown65715@gmail.com",
        password: "Anikhariyati72@",
      },
    }
  );

  fs.writeFileSync("result.html", result);
}

(async () => {
  try {
    const result = await main();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
