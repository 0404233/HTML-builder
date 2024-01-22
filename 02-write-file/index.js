const fs = require("fs");
const path = require("path");
const { stdin, stdout, stderr } = process;


stdout.write("Write your message.\n");

const input = fs.createWriteStream(path.join(__dirname, "text.txt"))

stdin.on("data", (data) => {
  if (data.toString().includes("exit")) {
    process.exit();
  }

  input.write(data);
})

process.on('SIGINT', () => process.exit());

process.on("exit", (code) => {
  if (code === 0) {
    stdout.write("Good luck!");
  };
});

