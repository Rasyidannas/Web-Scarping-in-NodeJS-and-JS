const request = require("request-promise").defaults({ jar: true });

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
}

main();
