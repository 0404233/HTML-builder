const path = require('path');
const fs = require('fs');
const process = require('process');

fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (err, data) => {
  if (err) throw err;

  const files = data
    .filter((file) => file.isFile())
    .map((file) => {
      const fileName = path.parse(file.name).name;;
      const ext = path.extname(file.name);
      return new Promise((resolve, reject) => {
        fs.stat(path.resolve(__dirname, 'secret-folder', `${file.name}`), (err, stat) => {
          if (err) return reject(err);
          const sizeInKB = (stat.size / 1024).toFixed(3);
          resolve(`${fileName} - ${ext.slice(1)} - ${sizeInKB}kb`);
        });
      });
    })

  Promise.all(files)
    .then((data) => {
      process.stdout.write(data.join('\n') + '\n');
    })
});
