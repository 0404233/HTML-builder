const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;

const distFolder = path.join(__dirname, "project-dist");
const stylesFolder = path.join(__dirname, "styles");

let array = '';



fs.readdir(stylesFolder, {withFileTypes: true}, (err, data) => {
  if (err) throw err;

  

  data.forEach((e) => {
    if(e.isFile()) {
      const name = e.name;
      const ext = path.extname(stylesFolder + name);

      const file = path.join(stylesFolder, `${name}`);

      if (ext === '.css') {

        fs.truncate(path.join(distFolder, "bundle.css"), err => {
          if(err) {
            fs.writeFile(path.join(distFolder, "bundle.css"), `${array}`, (err) => {
              if (err) throw err;
            }
            )
          };
       });

        const readableStream = fs.createReadStream(file, 'UTF-8');

        readableStream.on("data", (chunk) => {
          array += chunk;

          fs.writeFile(path.join(distFolder, "bundle.css"), `${array}`, (err) => {
            if (err) throw err;
          }
          )
        });
      }
    }
  })


})
