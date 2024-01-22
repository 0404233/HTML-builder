const fs = require("fs");
const path = require("path");
const { stdout } = process;

const read = fs.createReadStream(path.join(__dirname, "text.txt"));

read.on("data", (chunk) => {
  stdout.write(chunk.toString());
});