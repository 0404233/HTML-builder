const path = require('path');
const fs = require('fs').promises;

const main = path.resolve(__dirname, 'files');
const copy = path.resolve(__dirname, 'files-copy');

async function copyFolder(main, copy) {
  try {
    await fs.rm(copy, { recursive: true, force: true });
  } catch (err) {
    throw err;
  }

  await fs.mkdir(copy);

  const files = await fs.readdir(main);

  for (const file of files) {
    const mainPath = path.join(main, file);
    const coptPath = path.join(copy, file);

    await fs.copyFile(mainPath, coptPath);
  }
}

copyFolder(main, copy);