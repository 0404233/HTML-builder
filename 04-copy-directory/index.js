const fs = require("fs");
const path = require("path");



const folder = path.join(__dirname, "files");
const folderCopy = path.join(__dirname, "files-copy");




fs.mkdir(folderCopy,(err) => {
  if (err) {
    fs.rmdir(folderCopy, { recursive: true },(err) => {
      if (err) throw err;
    })
  }


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
});










