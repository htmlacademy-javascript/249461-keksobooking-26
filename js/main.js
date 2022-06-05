/**
 * Возвращает случайное число в указаном диапазоне.
 * @param min Минимально возможное значение
 * @param max Максимально возможное значение
 * @param roundUp Необходимо ли округлять полученное значение до целого числа (true/false). По умолчанию true
 * @returns {number} Случайное значение в указаном диапазоне
 */
function getRandomNumber(min,max, roundUp = true) {
  if (min > max) {
    throw new Error('Значение max не может быть меньше min');
  }
  if (min < 0 || max < 0) {
    throw new Error('Значение max или min не может быть меньше 0');
  }

  const number = min - 0.5 + Math.random() * (max - min + 1);

  if (roundUp) {
    return Math.round(number);
  }
  return number;
}

getRandomNumber(1,10);

/**
 * Возвращает значениче в указаном диапазоне в суказаным кол-вом символов после запятой
 * @param min Минимально возможное значение
 * @param max Максимально возможное значение
 * @param length Кол-во знаков после запятой от 0 до 100
 * @returns {string} Случайное значение в указаном диапазоне с указаным кол-во знаков после запятой
 */
function getRandomFloatNumber(min, max, length) {
  let number = getRandomNumber(min, max,false);

  number = number < min ? min : number;
  number = number > max ? max : number;

  return number.toFixed(length);
}

getRandomFloatNumber(1,10, 3);
