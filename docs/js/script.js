// alert('Hello, Gulp!');;

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

};
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  }
});

// document.querySelector('.menu__icon icon-menu').onclick = function () {
//   document.querySelector('.icon-menu').classList.toggle('icon-menu _active');
// }

$(document).ready(function () {
  $('.menu__icon icon-menu').click(function (event) {
    $('.menu__icon icon-menu, .header__menu').toggleClass('_active')
    $('menu__body').toggleClass('lock')
  })
})


// menu - icon
// menu - icon menu - icon - active