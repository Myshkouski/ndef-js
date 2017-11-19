import path from 'path'
import merge from 'lodash.merge'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import yaml from 'rollup-plugin-yaml'
import analyze from 'rollup-analyzer-plugin'

const __approot =path.resolve(__dirname, '../')
const __src = path.resolve(__approot, 'src/')
const __dist = path.resolve(__approot, 'dist/')



const bundles = []

bundles.push({
  input: path.resolve(__src, 'ndef.js'),
  output: {
    file: path.resolve(__dist, 'index.js'),
    format: 'cjs'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      jail: __approot,
      preferBuiltins: false
    }),

    commonjs(),

    yaml(),

    babel({
      exclude: 'node_modules/**'
    })
  ]
})

// minified
bundles.push(merge({}, bundles[0], {
  output: {
    sourcemap: true,
    file: path.resolve(__dist, 'index.min.js')
  },
  plugins: Array.from(bundles[0]).concat([
    uglify({
      sourceMap: true,
      toplevel: true
    }),

    analyze({
      limit: 5,
      root: __approot
    })
  ])
}))

export default bundles
