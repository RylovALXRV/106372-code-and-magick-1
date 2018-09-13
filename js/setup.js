'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var WIZARD_AMOUNT = 4;

var WizardFeature = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateWizards = function (amountWizards) {
  var wizards = [];

  for (var i = 0; i < amountWizards; i++) {
    wizards.push({
      fullName: getRandomElement(WizardFeature.NAMES) + ' ' + getRandomElement(WizardFeature.SURNAMES),
      coatColor: getRandomElement(WizardFeature.COAT_COLORS),
      eyesColor: getRandomElement(WizardFeature.EYES_COLORS)
    });
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var appendWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  document.querySelector('.setup-similar-list').appendChild(fragment);
};

var wizards = generateWizards(WIZARD_AMOUNT);

appendWizards(wizards);
// document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

// --------------------- #14 Учебный проект: одеть Надежду ----------------------

var KeyCode = {
  ENTER: 13,
  ESC: 27
};

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupUserNameElement = document.querySelector('.setup-user-name');
var setupWizardCoatElement = setupElement.querySelector('.wizard-coat');
var setupWizardEyesElement = setupElement.querySelector('.wizard-eyes');
var setupFireballElement = setupElement.querySelector('.setup-fireball');
var setupInputFireballHiddenElement = setupElement.querySelector('input[name="fireball-color"]');

var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === KeyCode.ESC && evt.target !== setupUserNameElement) {
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
  if (evt.keyCode === KeyCode.ENTER) {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    closePopup();
  }
});

var onSetupPlayerSelectColorClick = function (evt) {
  switch (evt.target) {
    case (setupWizardCoatElement):
      setupWizardCoatElement.style.fill = getRandomElement(WizardFeature.COAT_COLORS);
      setupElement.querySelector('input[name="coat-color"]').value = setupWizardCoatElement.style.fill;
      return;
    case (setupWizardEyesElement):
      setupWizardEyesElement.style.fill = getRandomElement(WizardFeature.EYES_COLORS);
      setupElement.querySelector('input[name="eyes-color"]').value = setupWizardEyesElement.style.fill;
      return;
    case (setupFireballElement):
      setupInputFireballHiddenElement.value = getRandomElement(WizardFeature.FIREBALL_COLORS);
      setupFireballElement.style.backgroundColor = setupInputFireballHiddenElement.value;
      return;
  }
};

document.querySelector('.setup-player').addEventListener('click', onSetupPlayerSelectColorClick);
