import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import rimraf from 'rimraf'
import path from 'path'

rimraf.sync(path.resolve(__dirname, 'umd'))

export default [
  // normal
  {
    input: 'src/index.js',
    plugins: [
      resolve(),
      commonjs()
    ],
    output: [{
      file: 'umd/nuxt-custom-start.js',
      format: 'umd',
      name: 'nuxt-custom-start'
    }]
  },
  // minified
  {
    input: 'src/index.js',
    plugins: [
      terser(),
      resolve(),
      commonjs()
    ],
    output: [{
      file: 'umd/nuxt-custom-start.min.js',
      format: 'umd',
      name: 'nuxt-custom-start'
    }]
  },
]
