const path = require('path')
const PluginError = require('plugin-error')
const through = require('through2')
const dependency = require('dependency-tree')
const merge = require('deepmerge')

const PLUGIN_NAME = 'gulp-circular-dependency'

let _dependencyStack = []

function travelTree (tree, cwd, callback) {
  const dependencies = Object.keys(tree)

  if (dependencies.length === 0) _dependencyStack = []

  dependencies.forEach(dep => {   
    const relativePath = path.relative(cwd, dep)

    if (_dependencyStack.indexOf(relativePath) > -1) {
      _dependencyStack.push(relativePath)

      throw new PluginError(
        PLUGIN_NAME,
        'Circular dependency: ' + _dependencyStack.join(' -> ')
      )
    } else {
      _dependencyStack.push(relativePath)
    }
    travelTree(tree[dep], cwd, callback)
  })
}

module.exports = function gulpCircularDependency (options = {}) {
  return through.obj((file, encoding, callback) => {
    if (file.isNull()) {
      return callback(null, file)
    }

    const cwd = file.cwd
    const filePath = file.path

    const opt = merge({
      filename: filePath,
      directory: cwd,
      detective: {
        es6: {
          mixedImports: true,
        },
      },
      filter: path => {
        return !(/node_modules/i.test(path))
      },
    }, options)

    const tree = dependency(opt)

    try {
      travelTree(tree, cwd, callback)
      callback(null, file)
    } catch (err) {
      callback(err, undefined)
    }
  })
}
