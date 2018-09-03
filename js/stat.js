'use strict';

var Bar = {
  GAP: 10,
  MAX_HEIGHT: 150,
  WIDTH: 40,
  WIDTH_BETWEEN_BARS: 50
};

var Cloud = {
  DEVIATION: 20,
  HEIGHT: 270,
  WIDTH: 420,
  WIDTH_LINE_X: 300,
  WIDTH_LINE_Y: 190,
  X: 100,
  Y: 10
};

var BAR_LEFT_BEGIN = Cloud.X + Bar.WIDTH_BETWEEN_BARS;
var COLOR_BLACK = '#000000';
var WIDTH_BAR_AND_TEXT = Bar.WIDTH + Bar.WIDTH_BETWEEN_BARS;

var values = [];

/*
* Функция для получения случайного значения от min до max включительно до десятого значения,
* если такое нужно
* */
function getRandomValue(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

/*
* Функция для получения не одинакового значения
* */
var getOriginalValue = function () {
  var value = getRandomValue(0.1, 1);
  while (values) {
    if (!~values.indexOf(value)) {
      values.push(value);
      break;
    }
    value = getRandomValue(0.1, 1);
  }
  return value;
};

var getColor = function () {
  return 'rgba(0, 0, 255, ' + getOriginalValue() + ')';
};

var displayTextCloud = function (ctx, text, x, y) {
  ctx.fillStyle = COLOR_BLACK;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

/*
* функция для получения максимального времени
* */
var getMaxTime = function (arr) {
  return Math.max.apply(null, arr);
};

var drawCloud = function (ctx, x, y, color) {
  // координаты X и Y с учетом всех точек расположенных на плоскостях

  var cords = [
    {
      x: x, // 100
      y: y // 10
    },
    {
      x: x + Cloud.WIDTH_LINE_X, // 100 + 300
      y: y + Cloud.DEVIATION // 10 + 20
    },
    {
      x: x + Cloud.WIDTH, // 100 + 420
      y: y // 10
    },
    {
      x: x + Cloud.WIDTH - Cloud.DEVIATION, // 100 + 420 - 20
      y: y + Cloud.WIDTH_LINE_Y // 10 + 190
    },
    {
      x: x + Cloud.WIDTH, // 100 + 420
      y: y + Cloud.HEIGHT // 10 + 270
    },
    {
      x: x + Cloud.WIDTH - Cloud.WIDTH_LINE_X, // 100 + 420 - 300
      y: y + Cloud.HEIGHT - Cloud.DEVIATION // 10 + 270 - 20
    },
    {
      x: x, // 100
      y: y + Cloud.HEIGHT // 10 + 270
    },
    {
      x: x + Cloud.DEVIATION, // 100 + 20
      y: y + Cloud.HEIGHT - Cloud.WIDTH_LINE_Y // 10 + 270 - 190
    }
  ];

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (var i = 0; i < cords.length; i++) {
    ctx.lineTo(cords[i].x, cords[i].y);
  }
  ctx.closePath();
  ctx.fill();
};

var renderStatsBar = function (ctx, data, cords) {
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillText(data.name, cords.x, cords.y - Bar.GAP * 3);
  if (data.name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = getColor();
  }
  ctx.fillRect(cords.x, cords.y - Bar.GAP * 4, Bar.WIDTH, -data.timePercentage);
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillText(Math.round(data.time), cords.x, cords.y - Bar.GAP * 6 - data.timePercentage);
};

window.renderStatistics = function (ctx, names, times) {
  // вызываю функцию с максимальным временем и записываю в переменную
  var maxTime = getMaxTime(times);

  drawCloud(ctx, Cloud.X + Bar.GAP, Cloud.Y + Bar.GAP, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, Cloud.X, Cloud.Y, '#fff');

  displayTextCloud(ctx, 'Ура вы победили!', Cloud.X + Bar.GAP * 2, Cloud.Y + Bar.GAP + Bar.GAP / 2);
  displayTextCloud(ctx, 'Список результатов:', Cloud.X + Bar.GAP * 2, Cloud.Y + Bar.GAP * 3 + Bar.GAP / 2);

  // вывод на экран статистики всех игроков
  for (var i = 0; i < names.length; i++) {
    // в функцию передаю объекты с данными и координатами
    renderStatsBar(ctx, {name: names[i], time: times[i], timePercentage: Math.round(times[i] * Bar.MAX_HEIGHT / maxTime)}, {x: BAR_LEFT_BEGIN + WIDTH_BAR_AND_TEXT * i, y: Cloud.HEIGHT});
  }
  // после получения нужных цветов для колонок - обнуляю массив
  values = [];
};
