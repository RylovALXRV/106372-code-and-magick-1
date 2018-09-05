'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var wizardFeature = {
  name: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surname: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var getRandomFeature = function (feature) {
  return feature[Math.floor(Math.random() * feature.length)];
};

var getFeaturesForWizard = function (wizard) {
  return {
    fullName: getRandomFeature(wizard.name) + ' ' + getRandomFeature(wizard.surname),
    coatColor: getRandomFeature(wizard.coatColor),
    eyesColor: getRandomFeature(wizard.eyesColor)
  };
};

var createSimilarWizard = function () {
  var element = similarWizardTemplate.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = getFeaturesForWizard(wizardFeature).fullName;
  element.querySelector('.wizard-coat').style.fill = getFeaturesForWizard(wizardFeature).coatColor;
  element.querySelector('.wizard-eyes').style.fill = getFeaturesForWizard(wizardFeature).eyesColor;
  return element;
};

var renderSimilarWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(createSimilarWizard(wizardFeature));
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
};

renderSimilarWizards();
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
