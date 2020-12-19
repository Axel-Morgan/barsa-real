let gulp = require ('gulp'),
    pug = require ('gulp-pug');


gulp.task('pug', function(){
    return gulp.src('#source/pug/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('general/'))
});

gulp.task('watch', function(){
    gulp.watch('#source/pug/*.pug', gulp.parallel('pug'));
    gulp.watch('#source/pug/modules/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('watch'));
