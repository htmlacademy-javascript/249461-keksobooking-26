import {createAds} from './data.js';

const similarAdsContent = createAds();
const mapCanvas = document.querySelector('#map-canvas');

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const apartmentNames = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

/**
 * Формирует список фотографий объявления
 * @param photosWrapper Блок обертка для фотографий
 * @param photoUrls Массив с адресами для отображения фото
 * @returns {*}
 */
const getPhotosList = (photosWrapper, photoUrls) => {
  const photoTemplate = photosWrapper.querySelector('img');
  const photosList = document.createDocumentFragment();

  photoUrls.forEach((url) => {
    const photo = photoTemplate.cloneNode();
    photo.src = url;
    photosList.appendChild(photo);
  });

  photosWrapper.textContent = '';
  photosWrapper.appendChild(photosList);
  return photosWrapper;
};

/**
 * Функция оставляет только те удобства которые указаны в объявлении
 * @param featuresWrapper Родительский блок списка с удобствами
 * @param adFeatures Списко доступных удобств
 */
const getFeatures = (featuresWrapper, adFeatures) => {
  const featuresList = featuresWrapper.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const exist = adFeatures.some(
      (adFeature) => featuresListItem.classList.contains(`popup__feature--${adFeature}`)
    );

    if (!exist) {
      featuresListItem.remove();
    }
  });
};

/**
 * Проверка существования текстового контента
 * @param element Элемент которому необходимо добавить содержимое
 * @param hasContent Проверяемое значение приведенное к boolean (!!)
 * @param content Содержимое для вставки
 * @param contentType Тип вставки; по умолчанию textContent; Также используется src;
 * @returns {*}
 */
const checkAdItemText = (element, hasContent, content, contentType = 'textContent') => {
  if (!hasContent) {
    return element.remove();
  }

  element[contentType] = content;
};

/**
 * Проверка массива на существование и длину.
 * Если массива нет, или его длина 0 обертка удаляется из разметки
 * @param wrapper Блок в который генерируется вставка списка элементов
 * @param dataList Массив данных для вставки
 * @param cb Функция которая генерирует код разметки на основе массива данных, и шаблона элемента внутри переданной обертки
 * @returns {*}
 */
const checkDataList = (wrapper, dataList, cb) => {
  if (dataList === undefined) {
    return wrapper.remove();
  }

  if (!dataList.length) {
    return wrapper.remove();
  }

  return cb(wrapper, dataList);
};

const similarAds = [];

similarAdsContent.forEach(({author, offer}) => {
  const similarAd = adTemplate.cloneNode(true);

  checkAdItemText(similarAd.querySelector('.popup__avatar'), !!author.avatar, author.avatar, 'src');
  checkAdItemText(similarAd.querySelector('.popup__title'), !!offer.title, offer.title);
  checkAdItemText(similarAd.querySelector('.popup__text--address'), !!offer.address, offer.address);
  checkAdItemText(similarAd.querySelector('.popup__text--price'), !!offer.price, `${offer.price} ₽/ночь`);
  checkAdItemText(similarAd.querySelector('.popup__type'), !!offer.type, apartmentNames[offer.type]);
  checkAdItemText(similarAd.querySelector('.popup__text--capacity'), !!offer.rooms && !!offer.guests, `${offer.rooms} комнаты для ${offer.guests} гостей`);
  checkAdItemText(similarAd.querySelector('.popup__text--time'), !!offer.checkin && !!offer.checkout, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  checkDataList(similarAd.querySelector('.popup__features'), offer.features, getFeatures);
  checkAdItemText(similarAd.querySelector('.popup__description'), !!offer.description, offer.description);
  checkDataList(similarAd.querySelector('.popup__photos'), offer.photos, getPhotosList);

  similarAds.push(similarAd);
});

mapCanvas.append(similarAds[0]);
