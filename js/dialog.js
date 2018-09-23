'use strict';
(function () {
  var overlayElement = document.querySelector('.overlay');
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var setupUserNameElement = document.querySelector('.setup-user-name');

  var resetStyles = function (element) {
    element.style.left = '';
    element.style.top = '';
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    resetStyles(overlayElement);
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

  var getCoordsElement = function (element) {
    var box = element.getBoundingClientRect();
    return {
      coordX: box.left + window.pageXOffset,
      coordY: box.top + window.pageYOffset,
      width: box.width
    };
  };

  document.querySelector('.upload').addEventListener('mousedown', function (evt) {
    var dragged = false;
    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onUploadMousemove = function (mousemoveEvt) {
      var coordsOverlayElement = getCoordsElement(overlayElement);
      dragged = true;
      var shift = {
        x: startCoords.x - mousemoveEvt.pageX,
        y: startCoords.y - mousemoveEvt.pageY
      };

      startCoords = {
        x: mousemoveEvt.pageX,
        y: mousemoveEvt.pageY
      };


      overlayElement.style.left = coordsOverlayElement.coordX - shift.x + coordsOverlayElement.width / 2 + 'px';
      overlayElement.style.top = coordsOverlayElement.coordY - shift.y + 'px';
    };

    var onUploadMouseup = function () {
      document.removeEventListener('mousemove', onUploadMousemove);
      document.removeEventListener('mouseup', onUploadMouseup);
      if (dragged) {
        var onSetupClick = function (clickEvt) {
          clickEvt.preventDefault();
          setupElement.removeEventListener('click', onSetupClick);
        };
        setupElement.addEventListener('click', onSetupClick);
      }
    };

    document.addEventListener('mousemove', onUploadMousemove);
    document.addEventListener('mouseup', onUploadMouseup);
  });

})();
