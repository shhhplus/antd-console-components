const path = require('path');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const url = require('@rollup/plugin-url');
const babel = require('rollup-plugin-babel');
const svg = require('rollup-plugin-svg');
const postcss = require('rollup-plugin-postcss');
const { uglify } = require('rollup-plugin-uglify');
const cssUrl = require('postcss-url');

const originalPackageInfo = require(path.join(process.cwd(), 'package.json'));
const tsconfig = require(path.join(process.cwd(), 'tsconfig.json'));

module.exports = ({ entryFile, packageFolder, componentsPath }) => {
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
        outDir: path.join(packageFolder, 'outDir'),
        include: [componentsPath],
        tsconfigOverride: {
          compilerOptions: {
            ...tsconfig.compilerOptions,
            declaration: true,
            declarationDir: path.join(packageFolder, 'declaration'),
          },
        },
        useTsconfigDeclarationDir: true,
      }),
    ],
    external: [...Object.keys(originalPackageInfo.dependencies), 'path'],
  };
};
