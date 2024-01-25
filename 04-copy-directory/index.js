const fs = require("fs");
const path = require("path");


const folder = path.join(__dirname, "files");
const folderCopy = path.join(__dirname, "files-copy");
const fsPromises = fs.promises; 


function copyFiles() {
  fs.readdir(folder, (err, data) => {
    if (err) throw err;

    data.forEach(e => {
  
      const file = path.join(folder, `${e}`);
      const fileCopy = path.join(folderCopy, `${e}`);
  
      fs.copyFile(file, fileCopy, (err) => {
        if (err) throw err;
      });
    })
  });
}

fs.readdir(folderCopy, (err, data) => {
  if (err) throw err;

  data.forEach(e => {
  
    const file = path.join(folder, `${e}`);
    const fileCopy = path.join(folderCopy, `${e}`);

    fs.unlink(fileCopy, err => {
      if (err) {
        fs.copyFile(file, fileCopy, (err) => {
          if (err) throw err;
        });
      }
    })
  })
})

fsPromises.mkdir(folderCopy).then(() => {
  copyFiles();
}).catch(() => {
  copyFiles();
})