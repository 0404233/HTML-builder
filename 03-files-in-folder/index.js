const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "secret-folder");






fs.readdir(folder, {withFileTypes: true}, (err, data) => {


  data.forEach((e) => {

    if(e.isFile()) {

      const nameOfFile = e.name;
      const parsedFile = path.parse(path.join(`${folder}`, `${nameOfFile}`));

      fs.stat(path.join(folder, `${parsedFile.base}`), (err, stats) => {
        const size = stats.size + 'b';
        process.stdout.write(`${parsedFile.name} - ${parsedFile.ext.slice(1)} - ${size}\n`);
      });
    }
  })
})

