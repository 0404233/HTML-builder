const path = require('path');
const fs = require('fs').promises;

const stylesFolder = path.resolve(__dirname, 'styles');
const bundleStylees = path.resolve(__dirname, 'project-dist', 'style.css');
const HTMLFile = path.resolve(__dirname, 'template.html');
const componentsHTML = path.resolve(__dirname, 'components');
const boundleHTML = path.resolve(__dirname, 'project-dist', 'index.html');
const assetsFolder = path.resolve(__dirname, 'assets');
const boundleAssets = path.join(__dirname, 'project-dist', 'assets');

(async function () {
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
}

async function createHTML(componentsHTML, bundle, HTMLFile) {
  let copy;
  const html = await fs.readFile(HTMLFile, 'utf8');

  const takeComponent = html.match(/{{(.*?)}}/g);

  copy = html;

  for (let component of takeComponent) {
    const clearName = component.slice(2, -2) + '.html';
    const allDataOfComp = await fs.readFile(path.resolve(componentsHTML, clearName), 'utf-8');

    copy = copy.replace(component, allDataOfComp);
  }

  await fs.writeFile(bundle, copy, 'utf8');
}

async function copyAssets(assetsFolder, bundle) {
  const queue = [{ main: assetsFolder, dist: bundle }];

  while (queue.length > 0) {
    const { main, dist } = queue.pop();

    const files = await fs.readdir(main, { withFileTypes: true });

    await fs.mkdir(dist, { recursive: true });

    for (let file of files) {
      const mainFile = path.join(main, file.name);
      const bundleFile = path.join(dist, file.name);

      if (file.isDirectory()) {
        queue.push({ main: mainFile, dist: bundleFile });
      } else {
        await fs.copyFile(mainFile, bundleFile);
      }
    }
  }
}


copyStyles(stylesFolder, bundleStylees);
createHTML(componentsHTML, boundleHTML, HTMLFile);
copyAssets(assetsFolder, boundleAssets);