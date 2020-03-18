
const { helperError } = require('./helper')

describe('gulp-circular-dependency', done => {
  before(() => {})

  it('find circular dependency', done => {
    const src = 'test/fixtures/a.js'
    const options = {}
    const expectedError = ' Circular dependency: test/fixtures/a.js -> test/fixtures/c.js -> test/fixtures/b.js -> test/fixtures/a.js'
  
    helperError(src, options, expectedError, done)
  })

  after(() => {})
})