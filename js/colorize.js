'use strict';
(function () {
  var setupElement = document.querySelector('.setup');
  var setupWizardCoatElement = setupElement.querySelector('.wizard-coat');
  var setupWizardEyesElement = setupElement.querySelector('.wizard-eyes');
  var setupFireballElement = setupElement.querySelector('.setup-fireball');

  var setFeatureColorUse = function (element, feature, selector) {
    element.style.fill = window.util.getRandomElement(feature);
    document.querySelector(selector).value = element.style.fill;
  };

  var setFeatureColorDiv = function (element, feature, selector) {
    document.querySelector(selector).value = window.util.getRandomElement(feature);
    element.style.backgroundColor = document.querySelector(selector).value;
  };

  var setPlayerSelectColor = function (evt, data) {
    switch (evt.target) {
      case (setupWizardCoatElement):
        setFeatureColorUse(setupWizardCoatElement, data.COAT_COLORS, 'input[name="coat-color"]');
        return;
      case (setupWizardEyesElement):
        setFeatureColorUse(setupWizardEyesElement, data.EYES_COLORS, 'input[name="eyes-color"]');
        return;
      case (setupFireballElement):
        setFeatureColorDiv(setupFireballElement, data.FIREBALL_COLORS, 'div.setup-fireball');
        return;
    }
  };

  window.colorize = function (elem, data) {
    elem.addEventListener('click', function (evt) {
      setPlayerSelectColor(evt, data);
    });
  };
})();
