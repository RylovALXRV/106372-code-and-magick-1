'use strict';
(function () {

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var setupUserNameElement = document.querySelector('.setup-user-name');

  var closePopup = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt) && evt.target !== setupUserNameElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      openPopup();
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      closePopup();
    }
  });

})();
