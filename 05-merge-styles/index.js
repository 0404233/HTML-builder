const path = require('path');
const fs = require('fs').promises;

const stylesFolder = path.resolve(__dirname, 'styles');
const bundle = path.resolve(__dirname, 'project-dist', 'bundle.css');

async function copyStyles(stylesFolder, bundle) {
  let copy = '';
  const styles = await fs.readdir(stylesFolder);

  for (let style of styles) {
    const ext = path.extname(style);
    if (ext === '.css') {
      const readFile = await fs.readFile(path.resolve(stylesFolder, style), 'utf8');
      copy += readFile + '\n';
    }
  }

  await fs.writeFile(bundle, copy, 'utf8');
  console.log(`Bundle is created`);
}

copyStyles(stylesFolder, bundle);