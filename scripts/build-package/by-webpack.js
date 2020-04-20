const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');

const originalPackageInfo = require(path.join(process.cwd(), 'package.json'));
const tsconfig = require(path.join(process.cwd(), 'tsconfig.json'));

const componentsPath = path.join(process.cwd(), 'src', 'components');
const packageFolder = path.join(process.cwd(), '.package/by-webpack');
const entryFileName = '_index.js';
const entryFile = path.join(componentsPath, entryFileName);

const removeFile = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  if (fs.statSync(filePath).isDirectory()) {
    return;
  }

  fs.unlinkSync(filePath);
};

const removeEntryFile = async () => {
  return removeFile(entryFile);
};

const createEntryFile = async () => {
  const dirs = fs.readdirSync(componentsPath);
  const list = dirs
    .filter((dir) => {
      return dir[0] !== '.' && dir[0] !== '_';
    })
    .map((dir) => {
      return `export { default as ${dir} } from './${dir}';`;
    });

  fs.writeFileSync(entryFile, list.join('\r\n'));
};

const createEntryDFile = async () => {
  const content = fs.readFileSync(entryFile);
  fs.writeFileSync(path.join(packageFolder, 'index.d.ts'), content);
};

const createInputOptions = async () => {
  return {
    entry: entryFile,
  };
};

const createOutputOptions = async () => {
  return {
    path: packageFolder,
    filename: 'index.js',
  };
};

const removePackageFolder = async () => {
  await new Promise((resolve, reject) => {
    rimraf(packageFolder, (err) => {
      err ? reject() : resolve();
    });
  });
};

const build = async () => {
  const inputOptions = await createInputOptions();
  console.log('inputOptions:', inputOptions);
  const outputOptions = await createOutputOptions();
  console.log('outputOptions:', outputOptions);

  const options = {
    ...inputOptions,
    output: outputOptions,
  };

  console.log('options:', options);

  await new Promise((resolve, reject) => {
    const compiler = webpack(options);
    compiler.run((err, stats) => {
      if (err) {
        console.log('err:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
  // await createEntryDFile();
};

const createPackageDotJson = async () => {
  const filePath = path.join(packageFolder, 'package.json');
  const obj = [
    'name',
    'version',
    'homepage',
    'main',
    'license',
    'keywords',
    'author',
    'bugs',
    'repository',
    'dependencies',
  ].reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: originalPackageInfo[cur],
    };
  }, {});
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
};

const createReadme = async () => {
  const src = path.join(process.cwd(), 'README.md');
  const dest = path.join(packageFolder, 'README.md');
  fs.copyFileSync(src, dest);
};

module.exports = async () => {
  await removePackageFolder();
  await removeEntryFile();
  await createEntryFile();
  await build();
  return;
  await removeEntryFile();
  await createPackageDotJson();
  await createReadme();
};
