const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "secret-folder");


fs.readdir(folder, {withFileTypes: true}, (err, data) => {
  data.forEach((e) => {
    if(e.isFile()) {
      const name = e.name;
      const ext = path.extname(folder + name);
      fs.stat(path.join(folder, name), (err, stats) => {
        const size = stats.size + 'kb';

        process.stdout.write(`${name} - ${ext} - ${size}\n`);
      });
    }
  })
})

