const path = require('path');
const fs = require('fs').promises;

const stylesFolder = path.resolve(__dirname, 'styles');
const bundleStylees = path.resolve(__dirname, 'project-dist', 'style.css');

(async function() {
  await fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true });
})()

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

copyStyles(stylesFolder, bundleStylees);