const fs = require('fs');
const path = require('path');
const { rollup } = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const svg = require('rollup-plugin-svg');
const postcss = require('rollup-plugin-postcss');
const url = require('rollup-plugin-url');
const { uglify } = require('rollup-plugin-uglify');
const cssUrl = require('postcss-url');

const packageInfo = require('../package.json');

const componentsPath = path.join(process.cwd(), 'src', 'components');
const targetPath = path.join(process.cwd(), '.build_package');
// console.log('process.cwd():', process.cwd());
// console.log('componentsPath:', componentsPath);

const createEntryFile = async () => {
  const dirs = fs.readdirSync(componentsPath);
  const entryFile = path.join(componentsPath, '.build_entry.js');
  const list = dirs
    .filter((dir) => {
      return dir[0] !== '.';
    })
    .map((dir) => {
      return `export { default as ${dir} } from './${dir}';`;
    })
    .concat([`export const version = '${packageInfo.version}';`]);

  fs.writeFileSync(entryFile, list.join('\r\n'));
  return entryFile;
};

const createInputOptions = async ({ entryFile }) => {
  return {
    input: entryFile,
    plugins: [
      babel({
        exclude: '../node_modules/**',
      }),
      uglify({
        ie8: true,
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
      resolve(),
      commonjs(),
    ],
    external: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'antd',
      'classnames',
      'lodash',
      '@shhhplus/timer.js',
      '@shhhplus/react-router-relative-link',
    ],
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
  const entryFile = await createEntryFile();

  const inputOptions = await createInputOptions({ entryFile });
  console.log('inputOptions:', inputOptions);
  const outputOptions = await createOutputOptions();
  console.log('outputOptions:', outputOptions);
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);

  // const { output } = bundle.generate(outputOptions);
};

execute();
