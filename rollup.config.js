import typescript from 'rollup-plugin-typescript';
import resolve    from 'rollup-plugin-node-resolve';
import pkg        from './package.json';

const name = 'BTree';
const sourcemap = true;

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main,   format: 'umd', name, sourcemap },
    { file: pkg.module, format: 'es', name, sourcemap }
  ],
  plugins: [
    resolve(),
    typescript({
      typescript: require('typescript')
    })
  ]
};
