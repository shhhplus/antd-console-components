const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { rollup } = require('rollup');
const configFactory = require('./rollup.config.js');

const originalPackageInfo = require(path.join(process.cwd(), 'package.json'));

const entryFileName = '_index.js';
const componentsPath = path.join(process.cwd(), 'src', 'components');
const packageFolder = path.join(process.cwd(), '.package/by-rollup');
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

const createOutputOptions = async () => {
  return {
    dir: packageFolder,
    // file: path.join(packageFolder, 'index.js'),
    name: originalPackageInfo.name,
    format: 'amd',
    sourcemap: true,
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
  const inputOptions = configFactory({
    entryFile,
    packageFolder,
    componentsPath,
  });
  // console.log('inputOptions:', inputOptions);
  const outputOptions = await createOutputOptions();
  // console.log('outputOptions:', outputOptions);
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
  await createEntryDFile();
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

const renamePackageFile = async () => {
  const files = fs.readdirSync(packageFolder);
  const name = path.basename(entryFile, '.js');
  const toRenameTasks = files
    .map((file) => {
      const filePath = path.join(packageFolder, file);
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) {
        return null;
      }

      const basename = path.basename(filePath);
      const [first, ...rest] = basename.split('.');
      return first === name
        ? {
            oldPath: filePath,
            newPath: path.join(packageFolder, ['index', ...rest].join('.')),
          }
        : null;
    })
    .filter((item) => item);

  for (let task of toRenameTasks) {
    fs.renameSync(task.oldPath, task.newPath);
  }
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
  await removeEntryFile();
  await renamePackageFile();
  await createPackageDotJson();
  await createReadme();
};
