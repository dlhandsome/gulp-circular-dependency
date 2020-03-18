const path = require('path')
const { expect } = require('chai')
const  gulp = require('gulp')
const circularDependency = require('../')

exports.helper = function(srcArgs, options, expectedPath, done) {
  let srcPattern = srcArgs.pattern || srcArgs
  let srcOptions = srcArgs.options || {}
  let stream = gulp.src(srcPattern, srcOptions).pipe(circularDependency(options))
  let count = 0
  stream.on('error', done)
  stream.on('data', function() {
    count++
  })
  if (expectedPath) {
    stream.on('data', function(file) {
      let resolvedExpectedPath = path.resolve(expectedPath)
      let resolvedActualPath = path.join(file.base, file.relative)

      expect(resolvedActualpath).to.equal(resolvedExpectedPath)
      done()
    })
  }
  stream.on('end', function() {
    done.apply(this, arguments)
  })
}

exports.helperError = function(srcPattern, options, expectedError, done) {
  let stream = gulp.src(srcPattern).pipe(circularDependency(options))
  stream.on('error', function(err) {
    expect(err.message).to.equal(expectedError)
    done()
  })
  stream.on('data', function() {})
  stream.on('end', done)
}