const path = require('path');
const fs = require('fs');
const process = require('process');

const pathToFile = path.resolve(__dirname, 'text.txt');

const writeFileAsync = (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, (err) => {
      if (err) rej(err);
      res();
    })
  })
}

const appendFileAsync = (path, data) => {
  return new Promise((res, rej) => {
    fs.appendFile(path, data, (err) => {
      if (err) rej(err);
      res();
    })
  })
}

function exit() {
  console.log('Thank you! Goodbye!');
  process.exit(0);
}

writeFileAsync(pathToFile, '')
  .then(() => {
    process.stdout.write('File is created! \n');
    process.stdin.on('data', (data) => {
      if (data.toString().trim() === 'exit') {
        exit();
      }
      appendFileAsync(pathToFile, data)
        .then(() => console.log('Data appended!'))
        .catch((err) => console.error('Error appending data:', err));
    })
  })
  .catch((err) => console.error('Error creating file:', err));

process.on('SIGINT', () => {
  console.log('Thank you! Goodbye!');
  process.exit(0);
});