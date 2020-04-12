const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { rollup } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const url = require('@rollup/plugin-url');
const babel = require('rollup-plugin-babel');
const svg = require('rollup-plugin-svg');
const postcss = require('rollup-plugin-postcss');
const { uglify } = require('rollup-plugin-uglify');
const cssUrl = require('postcss-url');

const originalPackageInfo = require('../package.json');

const entryFileName = '_index.js';
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
const tsconfig = require(tsconfigPath);
// console.log('tsconfig:', tsconfig);
// console.log('tsconfigPath:', tsconfigPath);
const componentsPath = path.join(process.cwd(), 'src', 'components');
const packageFolder = path.join(process.cwd(), '.package');
const entryFile = path.join(componentsPath, entryFileName);
// console.log('process.cwd():', process.cwd());
// console.log('componentsPath:', componentsPath);

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
    })
    .concat([`export const version = '${originalPackageInfo.version}';`]);

  fs.writeFileSync(entryFile, list.join('\r\n'));
};

const createInputOptions = async () => {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  return {
    input: entryFile,
    plugins: [
      babel({
        // exclude: 'node_modules/**',
        extensions,
      }),
      uglify({
        mangle: false,
        compress: {
          pure_funcs: ['console.log'],
        },
      }),
      postcss({
        modules: true,
        plugins: [cssUrl({ url: 'inline' })],
      }),
      json(),
      svg(),
      url({
        limit: 50 * 1024, // inline files < 10k, copy files > 10k
      }),
      resolve({
        preferBuiltins: true,
        extensions,
      }),
      commonjs({
        namedExports: {
          'react-is': ['isValidElementType'],
        },
      }),
      typescript({
        tsconfig: false,
        ...tsconfig.compilerOptions,
        outDir: path.join(packageFolder, 'outDir'),
        include: [componentsPath],
      }),
    ],
    external: [...Object.keys(originalPackageInfo.dependencies), 'path'],
  };
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
  const inputOptions = await createInputOptions();
  // console.log('inputOptions:', inputOptions);
  const outputOptions = await createOutputOptions();
  // console.log('outputOptions:', outputOptions);
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
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

  // console.log('toRenameTasks:', toRenameTasks);

  for (let task of toRenameTasks) {
    fs.renameSync(task.oldPath, task.newPath);
  }
};

const createReadme = async () => {
  const src = path.join(process.cwd(), 'README.md');
  const dest = path.join(packageFolder, 'README.md');
  fs.copyFileSync(src, dest);
};

(async () => {
  await removePackageFolder();
  await removeEntryFile();
  await createEntryFile();
  await build();
  await removeEntryFile();
  await renamePackageFile();
  await createPackageDotJson();
  await createReadme();
})();
