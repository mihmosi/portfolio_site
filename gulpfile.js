// const { src, dest } = require('gulp');

let projectFolder = "dist";
let sourceFolder = "src";

let path = {
  bild: {
    html: projectFolder+"/",
    css: projectFolder+"/css/",
    js: projectFolder+"/js/",
    img: projectFolder+"/img/",
    fonts: projectFolder+"/fonts/",
  },
  src: {
    html: [sourceFolder+"/*.html", "!"+sourceFolder+"/_*.html"],
    css: sourceFolder+"/scss/style.scss",
    js: sourceFolder+"/js/script.js",
    img: sourceFolder+"/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourceFolder+ "/fonts/*.ttf",
  },
  watch: {
    html: sourceFolder+"/**/*.html",
    css: sourceFolder+"/scss/**/*.scss",
    js: sourceFolder+"/js/**/*.js",
    img: sourceFolder+"/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + projectFolder + "/"
}

let { src , dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require('gulp-rename');
  
function browserSync(params) {
  browsersync.init({
    server:{
      baseDir: "./" + projectFolder + "/"
    },
    port:3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.bild.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(
      group_media()
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(dest(path.bild.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.bild.css))
    .pipe(browsersync.stream())
}



function watchFiles(params) {
  gulp.watch([path.watch.html],  html);
  gulp.watch([path.watch.css],  css); 
}

function clean(params) {
  return del(path.clean)
}

let bild = gulp.series(clean, gulp.parallel(css, html));
let watch = gulp.parallel(bild, watchFiles, browserSync);

exports.css = css;
exports.html = html;
exports.bild = bild;
exports.watch = watch;
exports.default = watch;
  