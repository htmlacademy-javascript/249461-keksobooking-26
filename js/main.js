// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
/**
 * Случайное положительное число в заданом диапазоне
 * @param a Начальное число
 * @param b Конечное число
 * @returns {number} Случайное число
 */
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
/**
 * Случайное положительное число с плавающей точкой в заданом диапазоне
 * @param a Начальное число
 * @param b Конечное число
 * @param digits Кол-во знаков после запятой
 * @returns {number} Случайное число с плавающей точкой
 */
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
}

/* ----- DEMODATA ----- */
const SOME_ADS_COUNTER = 10;

const TitleLength = {
  MIN: 30,
  MAX: 100,
};
const DescriptionLength = {
  MIN: 30,
  MAX: 230,
};

const Rooms = {
  MIN: 1,
  MAX: 5,
};

const Guests = {
  MIN: 1,
  MAX: 10,
};

const Price = {
  MIN: 0,
  MAX: 100000,
};

const latitude = {
  MIN: 35.65000,
  MAX: 35.70000,
  DIGITS: 5,
};

const longitude = {
  MIN: 139.70000,
  MAX: 139.80000,
  DIGITS: 5,
};

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const ACCOMODATION_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 * Генерация массива фотографий случайной длины
 * @returns {string[]} Массив фотографий
 */
function getPhotos() {
  const photosListLength = getRandomPositiveInteger(0, PHOTOS.length - 1);

  return PHOTOS.slice(photosListLength);
}

/**
 * Перемешивает зачения массива и возвращает новый массив случаной длинны
 * @returns {string[]} Массив случайных доступных удобств
 */
function getSomeFeatures() {
  const featuresListLength = getRandomPositiveInteger(0, FEATURES.length - 1);
  const shuffleFeatures = FEATURES.sort(() => Math.random() - 0.5);
  return shuffleFeatures.slice(featuresListLength);
}

/**
 * Функция генерации текста случайной длинны для Title или Description
 * @param minLength Минимальная длина
 * @param maxLength Максимальная длина
 * @returns {string}
 */
function generateTextRandomLength(minLength, maxLength) {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const randomLength = getRandomPositiveInteger(minLength, maxLength);
  return text.substring(0, randomLength);
}

/**
 * Генерация объявления со случайными данными
 * @returns Объект с данными объявления
 */
function createSomeAd() {
  const lat = getRandomPositiveFloat(latitude.MIN, latitude.MAX, latitude.DIGITS);
  const lng = getRandomPositiveFloat(longitude.MIN, longitude.MAX, longitude.DIGITS);

  return {
    author: {
      avatar: AVATARS[getRandomPositiveInteger(0, AVATARS.length - 1)],
    },
    offer: {
      title: generateTextRandomLength(TitleLength.MIN, TitleLength.MAX),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(Price.MIN, Price.MAX),
      type: ACCOMODATION_TYPES[getRandomPositiveInteger(0, ACCOMODATION_TYPES.length - 1)],
      rooms: getRandomPositiveInteger(Rooms.MIN, Rooms.MAX),
      guests: getRandomPositiveInteger(Guests.MIN, Guests.MAX),
      checkin: CHECKIN[getRandomPositiveInteger(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomPositiveInteger(0, CHECKOUT.length - 1)],
      features: getSomeFeatures(),
      description: generateTextRandomLength(DescriptionLength.MIN, DescriptionLength.MAX),
      photos: getPhotos(),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
}

Array.from({length: SOME_ADS_COUNTER}, createSomeAd);
