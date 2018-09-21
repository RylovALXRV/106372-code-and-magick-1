'use strict';
(function () {
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

  var generateWizards = function (amountWizards) {
    var wizards = [];

    for (var i = 0; i < amountWizards; i++) {
      wizards.push({
        fullName: window.util.getRandomElement(WizardFeature.NAMES) + ' ' + window.util.getRandomElement(WizardFeature.SURNAMES),
        coatColor: window.util.getRandomElement(WizardFeature.COAT_COLORS),
        eyesColor: window.util.getRandomElement(WizardFeature.EYES_COLORS)
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
  document.querySelector('.setup-similar').classList.remove('hidden');

  window.colorize(document.querySelector('.setup-player'), WizardFeature);
})();
