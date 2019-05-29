    var gulp       = require('gulp'),  
        sass         = require('gulp-sass'), 
        browserSync  = require('browser-sync'), 
        rename       = require('gulp-rename'),
        del          = require('del'), 
        imagemin     = require('gulp-imagemin'), 
        pngquant     = require('imagemin-pngquant'), 
        cache        = require('gulp-cache'), 
        autoprefixer = require('gulp-autoprefixer');
        webp = require('gulp-webp');

    gulp.task('sass', function() { 
        return gulp.src('app/sass/**/*.scss') 
            .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true })) 
            .pipe(gulp.dest('app/css')) 
            .pipe(browserSync.reload({stream: true})) 
    });

    gulp.task('browser-sync', function() { 
        browserSync({
            server: { 
                baseDir: 'app' 
            },
            notify: false 
        });
    });

     gulp.task('scripts', function() {
    return gulp.src('app/js/common.js')
    .pipe(browserSync.reload({ stream: true }))
});


    
    gulp.task('code', function() {
        return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
    });


    gulp.task('clean', async function() {
        return del.sync('dist'); 
    });

    gulp.task('img', function() {
        return gulp.src('app/images/**/*')
            .pipe(cache(imagemin({ 
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            })))
            .pipe(gulp.dest('app/images')); 
    });

     gulp.task('webp',async function () {
    return gulp.src('app/images/*.jpg')      
   .pipe(webp({quality:90}))
        .pipe(gulp.dest('app/images/webp'))
   
    });

    gulp.task('prebuild', async function() {


        var buildCss = gulp.src([
            'app/css/main.css',
           
            ])
        .pipe(gulp.dest('dist/css'))

        var buildFonts = gulp.src('app/fonts/**/*') 
        .pipe(gulp.dest('dist/fonts'))

        var buildJs = gulp.src('app/js/**/*') 
        .pipe(gulp.dest('dist/js'))


        var buildHtml = gulp.src('app/*.html') 
        .pipe(gulp.dest('dist'));

        var buildImg = gulp.src('app/images/**/*') 
        .pipe(gulp.dest('dist/images/webp'));

    });

    gulp.task('clear', function (callback) {
        return cache.clearAll();
    })


    gulp.task('watch', function() {
        gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); 
        gulp.watch('app/*.html', gulp.parallel('code')); 
        gulp.watch('app/js/common.js', gulp.parallel('scripts'))
    });
    gulp.task('default', gulp.parallel('sass','webp', 'browser-sync','watch'));
    gulp.task('build', gulp.parallel('prebuild','webp', 'clean', 'img','sass','scripts','browser-sync'));
