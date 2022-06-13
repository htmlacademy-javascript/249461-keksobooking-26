// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
/**
 * Случайное положительное число в заданом диапазоне
 * @param a Начальное число
 * @param b Конечное число
 * @returns {number} Случайное число
 */
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
/**
 * Случайное положительное число с плавающей точкой в заданом диапазоне
 * @param a Начальное число
 * @param b Конечное число
 * @param digits Кол-во знаков после запятой
 * @returns {number} Случайное число с плавающей точкой
 */
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

export {getRandomPositiveInteger,getRandomPositiveFloat};
