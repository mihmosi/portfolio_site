// const { src, dest } = require('gulp');

let projectFolder = "dest";
let sourceFolder = "src";

let path = {
  bild: {
    html: projectFolder+"/",
    css: projectFolder+"css/",
    js: projectFolder+"js/",
    img: projectFolder+"/img/",
    fonts: projectFolder+"/fonts/",
  },
  src: {
    html: sourceFolder+"/*.html",
    css: sourceFolder+"scss/style.scss",
    js: sourceFolder+"js/script.js",
    img: sourceFolder+"/img/**/*.(jpg,png,svg,gif,ico,webp)",
    fonts: sourceFolder+ "/fonts/*.ttf",
  },
  watch: {
    html: sourceFolder+"/**/*.html",
    css: sourceFolder+"scss/**/*.scss",
    js: sourceFolder+"js/**/*.js",
    img: sourceFolder+"/img/**/*.(jpg,png,svg,gif,ico,webp)",
  },
  clean: "./" + projectFolder + "/"
}

let { src , dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create();
  
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
    .pipe(dest(path.bild.html))
    .pipe(browsersync.stream())
}

let bild = gulp.series(html);

let watch = gulp.parallel(bild, browserSync);

exports.html = html;
exports.bild = bild;
exports.watch = watch;
exports.default = watch;
  