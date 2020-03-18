# gulp-circular-dependency

[![build status](https://secure.travis-ci.org/dlhandsome/gulp-circular-dependency.svg)](https://travis-ci.org/dlhandsome/gulp-circular-dependency.svg) [![npm-version](https://img.shields.io/npm/v/gulp-circular-dependency.svg)](https://www.npmjs.com/package/gulp-circular-dependency)

[中文](./README_ZH.md)

Detect modules with circular dependencies when processing javascript

## Install

```
npm install --save-dev gulp-circular-dependency
```

## Usage

```js
const gulp = require('gulp');
const circularDependency = require('gulp-circular-dependency');

gulp.task('default', () =>
	gulp.src('src/**/*.js')
		.pipe(circularDependency())
		.pipe(gulp.dest('dist'))
);
```

## API

See the dependency-tree [options](https://github.com/dependents/node-dependency-tree#options).

## License

MIT © [dlhandsome](./LICENSE)