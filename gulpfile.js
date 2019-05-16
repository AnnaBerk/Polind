    var gulp       = require('gulp'), // Подключаем Gulp
        sass         = require('gulp-sass'), //Подключаем Sass пакет,
        browserSync  = require('browser-sync'), // Подключаем Browser Sync
        concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
        uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
        cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
        rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
        del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
        imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
        pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
        cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
        autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

    gulp.task('sass', function() { // Создаем таск Sass
        return gulp.src('app/sass/**/*.scss') // Берем источник
            .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    })) // Преобразуем Sass в CSS посредством gulp-sass
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
            .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
            .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    });

    gulp.task('browser-sync', function() { // Создаем таск browser-sync
        browserSync({ // Выполняем browserSync
            server: { // Определяем параметры сервера
                baseDir: 'app' // Директория для сервера - app
            },
            notify: false // Отключаем уведомления
        });
    });

    
    gulp.task('code', function() {
        return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
    });


    gulp.task('clean', async function() {
        return del.sync('dist'); // Удаляем папку dist перед сборкой
    });

    gulp.task('img', function() {
        return gulp.src('app/images/**/*') // Берем все изображения из app
            .pipe(cache(imagemin({ // С кешированием
            // .pipe(imagemin({ // Сжимаем изображения без кеширования
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))/**/)
            .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
    });

    gulp.task('scripts', function() {
    return gulp.src('app/js/common.js')
    .pipe(browserSync.reload({ stream: true }))
});

    gulp.task('prebuild', async function() {

        var buildCss = gulp.src([ // Переносим библиотеки в продакшен
            'app/css/main.css',
           
            ])
        .pipe(gulp.dest('dist/css'))

        var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

        var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

    });

    gulp.task('clear', function (callback) {
        return cache.clearAll();
    })

    gulp.task('lint-css', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src('src/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

    gulp.task('watch', function() {
        gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
        gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
        gulp.watch('app/js/common.js', gulp.parallel('scripts'));
    });
    gulp.task('default', gulp.parallel('sass', 'browser-sync','watch'));
    gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass'));
