import babel from 'rollup-plugin-babel';
import commonjs from "rollup-plugin-commonjs";
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**', 
      presets: [ [ 'es2015', { modules: false } ], 'stage-0', 'react' ],
      plugins: [ 'external-helpers' ]
    }),
    commonjs({
      include: [
        'node_modules/**'
      ],
      exclude: [
        'node_modules/process-es6/**'
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    globals(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    resolve({
      browser: true,
      main: true
    }),
  ]
};