'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var WizardFeature = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// var createWizard = function () {
//   return {
//     fullName: getRandomElement(WizardFeature.NAME) + ' ' + getRandomElement(WizardFeature.SURNAME),
//     coatColor: getRandomElement(WizardFeature.COAT_COLOR),
//     eyesColor: getRandomElement(WizardFeature.EYES_COLOR)
//   };
// };

// это как альтернатива -> наставник предыдущий показывал.)
// var wizards = Array.apply(null, {length: 4}).map(Function.call, createWizard);

var generateWizards = function (length, wizard) {
  var wizards = [];

  for (var i = 0; i < length; i++) {
    wizards.push({
      fullName: getRandomElement(wizard.NAME) + ' ' + getRandomElement(wizard.SURNAME),
      coatColor: getRandomElement(wizard.COAT_COLOR),
      eyesColor: getRandomElement(wizard.EYES_COLOR)
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
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
};

var wizards = generateWizards(4, WizardFeature);

appendWizards(wizards);
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
