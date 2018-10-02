const gulp = require('gulp'),
babel = require('gulp-babel')

const sourcePath = 'src/mapnet.js'

gulp.task('es5', () => {
  return gulp.src(sourcePath)
    .pipe(babel({
      preset: ['es2015']
    }))
    .pipe(gulp.dest('build'))
})

gulp.task('dafault', ['es5'], () => {
  gulp.watch(sourcePath, ['es5'])
})
