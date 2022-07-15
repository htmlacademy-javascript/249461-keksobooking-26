import {deactivateForm} from './forms.js';
import {createAdPopup} from './popup.js';
import {filterType, filterPrice, filterRooms, filterGuests, filterFeatures} from './filters.js';

const MAP_START = {
  lat: 35.67500,
  lng: 139.75000,
  scale: 12
};

const MAIN_PIN_START = {
  lat: 35.65000,
  lng: 139.70000,
};

const MAIN_PIN_ICON = {
  url: './img/main-pin.svg',
  size: [52, 52],
  corner: [26, 52],
};

const AD_PIN_ICON = {
  url: './img/pin.svg',
  size: [40, 40],
  corner: [20, 40],
};

const DIGITS = 5;
const ADS_COUNTER = 10;

import {advertsPromise} from './backend.js';
const adForm = document.querySelector('.ad-form');
const priceRangeSlider = adForm.querySelector('.ad-form__slider');
const filtersForm = document.querySelector('.map__filters');


const addressField = adForm.querySelector('#address');
addressField.value = `${MAIN_PIN_START.lat.toFixed(DIGITS)}, ${MAIN_PIN_START.lng.toFixed(DIGITS)}`;

const map = L.map('map-canvas')
  .on('load', () => {
    deactivateForm('.ad-form', false);
  })
  .setView({
    lat: MAP_START.lat,
    lng: MAP_START.lng,
  }, MAP_START.scale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.icon({
  iconUrl: MAIN_PIN_ICON.url,
  iconSize: MAIN_PIN_ICON.size,
  iconAnchor: MAIN_PIN_ICON.corner,
});

const mainMapPin = L.marker(
  {
    lat: MAIN_PIN_START.lat,
    lng: MAIN_PIN_START.lng,
  },
  {
    draggable: true,
    icon: mainPin
  }
);

mainMapPin.addTo(map);

mainMapPin.on('move', (evt) => {
  const address = evt.target.getLatLng();
  addressField.value = `${address.lat.toFixed(DIGITS)}, ${address.lng.toFixed(DIGITS)}`;
});

/* Метки объявлений */
const adPinIcon = L.icon({
  iconUrl: AD_PIN_ICON.url,
  iconSize: AD_PIN_ICON.size,
  iconAnchor: AD_PIN_ICON.corner,
});


const mapPinLayer = L.layerGroup().addTo(map);

const createAdMarkers = (author, offer, location) => {
  const mapPin = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: adPinIcon
    }
  );
  mapPin
    .addTo(mapPinLayer)
    .bindPopup(createAdPopup(author, offer));

};


const showFilteredAds = (similarAdsList) => {
  mapPinLayer.clearLayers();
  similarAdsList
    .filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterFeatures)
    .slice(0, ADS_COUNTER)
    .forEach(({author, offer, location}) => {
      createAdMarkers(author, offer, location);
    });
};

const setDefaultAddress = () => {
  mainMapPin.setLatLng({
    lat: MAIN_PIN_START.lat,
    lng: MAIN_PIN_START.lng,
  });

  map.setView({
    lat: MAP_START.lat,
    lng: MAP_START.lng,
  }, MAP_START.scale);

  addressField.value = `${MAIN_PIN_START.lat.toFixed(DIGITS)}, ${MAIN_PIN_START.lng.toFixed(DIGITS)}`;
};

/* Кнопка сброса карты и маркера к дефолту */
const resetButton = adForm.querySelector('.ad-form__reset');

const resetFilters = () => {
  filtersForm.reset();
  advertsPromise.then((ads) => {
    showFilteredAds(ads);
  });
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  priceRangeSlider.noUiSlider.set(0);

  setDefaultAddress();

  resetFilters();
});


export {
  showFilteredAds,
  setDefaultAddress,
  resetFilters
};
