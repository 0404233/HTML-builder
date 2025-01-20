const path = require('path');
const fs = require('fs');

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {encoding: 'utf-8'});

stream.on('data', (data) => {
  console.log(data);
})