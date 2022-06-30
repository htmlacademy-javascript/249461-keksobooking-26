import {adForm, deactivateForms} from './forms.js';
import {similarAdsContent, createAdPopup} from './popup.js';


const MAP_START = {
  lat: 35.67500,
  lng: 139.75000,
  scale: 12
};

const MAIN_PIN_START = {
  lat: 35.65000,
  lng: 139.70000,
};

const map = L.map('map-canvas')
  .on('load', () => {
    deactivateForms(false);
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

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMapPin = L.marker(
  {
    lat: MAIN_PIN_START.lat,
    lng: MAIN_PIN_START.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
);

mainMapPin.addTo(map);

mainMapPin.on('moveend', (evt) => {
  const addressField = adForm.querySelector('#address');
  const address = evt.target.getLatLng();
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
});

/* Метки объявлений */
const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

similarAdsContent.forEach(({author, offer, location}) => {
  createAdMarkers(author, offer, location);
});

/* очистка слоя с маркерами объявлений */
//mapPinLayer.clearLayers();


/* Кнопка сброса карты и маркера к дефолту */
const resetButton = adForm.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  mainMapPin.setLatLng({
    lat: MAIN_PIN_START.lat,
    lng: MAIN_PIN_START.lng,
  });

  map.setView({
    lat: MAP_START.lat,
    lng: MAP_START.lng,
  }, MAP_START.scale);
});
