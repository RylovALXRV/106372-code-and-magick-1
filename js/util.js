'use strict';

window.util = (function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  return {
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    isEscEvent: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    },
    isEnterEvent: function (evt) {
      return evt.keyCode === KeyCode.ENTER;
    }
  };
})();
