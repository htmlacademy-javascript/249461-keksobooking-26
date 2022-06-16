import {createAds} from './data.js';

const similarAdsContent = createAds();
const mapCanvas = document.querySelector('#map-canvas');

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const getApartmentName = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'hotel':
      return 'Отель';
  }
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

  for (let i = 0; i < photoUrls.length; i++) {
    const photo = photoTemplate.cloneNode();
    photo.src = photoUrls[i];
    photosList.appendChild(photo);
  }

  photosWrapper.textContent = '';
  photosWrapper.appendChild(photosList);
  return photosWrapper;
};

/**
 * Функция оставляет только те удобства которые указаны в объявлении
 * @param featuresList Список всех удобств
 * @param adFeatures Списко доступных удобств
 */
const getFeatures = (featuresList, adFeatures) => {
  featuresList.forEach((featuresListItem) => {
    const exist =  adFeatures.some(
      (adFeature) => featuresListItem.classList.contains(`popup__feature--${adFeature}`)
    );

    if (!exist) {
      featuresListItem.remove();
    }
  });
};

/*
! При такой проверке линтер ругается что не используется 1 из параметров (3-ий).
! Хотя функция отрабатывает корректно

const checkAdItem = (item, element, includeContentType = 'textContent') => {
  item ? element.includeContentType = item : element.remove();
};*/

const similarAds = [];

similarAdsContent.forEach(({author, offer}) => {
  const similarAd = adTemplate.cloneNode(true);

  similarAd.querySelector('.popup__avatar').src = author.avatar;
  similarAd.querySelector('.popup__title').textContent = offer.title;
  similarAd.querySelector('.popup__text--address').textContent = offer.address;
  similarAd.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  similarAd.querySelector('.popup__type').textContent = getApartmentName(offer.type);
  similarAd.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  similarAd.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getFeatures(similarAd.querySelectorAll('.popup__features .popup__feature'),offer.features);
  similarAd.querySelector('.popup__description').textContent = offer.description;
  getPhotosList(similarAd.querySelector('.popup__photos'), offer.photos);

  similarAds.push(similarAd);
});

mapCanvas.append(similarAds[0]);

