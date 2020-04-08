const fs = require('fs');
const path = require('path');
// const builtins = require('builtin-modules');
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

const packageInfo = require('../package.json');

const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
console.log('tsconfigPath:', tsconfigPath);
const componentsPath = path.join(process.cwd(), 'src', 'components');
const targetPath = path.join(process.cwd(), '.build_package');
const entryFile = path.join(componentsPath, '.build_entry.js');
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
    .concat([`export const version = '${packageInfo.version}';`]);

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
        tsconfig: tsconfigPath,
      }),
    ],
    // external: Object.keys(packageInfo.dependencies),
    external: [...Object.keys(packageInfo.dependencies), 'path'],
  };
};

const createOutputOptions = async () => {
  return {
    file: path.join(targetPath, 'index.js'),
    format: 'amd',
    sourcemap: true,
  };
};

const execute = async () => {
  await removeEntryFile();
  await createEntryFile();
  const inputOptions = await createInputOptions();
  console.log('inputOptions:', inputOptions);
  const outputOptions = await createOutputOptions();
  // console.log('outputOptions:', outputOptions);
  const bundle = await rollup(inputOptions);

  return;

  await bundle.write(outputOptions);
};

execute();
