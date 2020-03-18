# gulp-circular-dependency

一款用于检测 Javascript 模块循环依赖性的 gulp 插件

## 安装

```
npm install --save-dev gulp-circular-dependency
```

## 使用

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

参考 dependency-tree [options](https://github.com/dependents/node-dependency-tree#options).

## License

MIT © [dlhandsome](./LICENSE)