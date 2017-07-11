'user strict';

module.exports = function() {
  var base = '';

  var config = {
    base : base,

    scss: [
      base + 'scss/**/*.scss',
    ],

    build_scss: './' + base + 'build/css',

    img: [
      base + 'images/**/*.png',
      base + 'images/**/*.jpg'
    ],

    build_img: './'+ base + 'images/'
  };
  return config;
};
