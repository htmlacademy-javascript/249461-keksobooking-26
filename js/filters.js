const filtersForm = document.querySelector('.map__filters');

const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const featureWifi = filtersForm.querySelector('#filter-wifi');
const featureDishwasher = filtersForm.querySelector('#filter-dishwasher');
const featureParking = filtersForm.querySelector('#filter-parking');
const featureWasher = filtersForm.querySelector('#filter-washer');
const featureElevator = filtersForm.querySelector('#filter-elevator');
const featureConditioner = filtersForm.querySelector('#filter-conditioner');

const filterType = ({offer}) => {
  if (housingType.value !== 'any') {
    return housingType.value === offer.type;
  }
  return true;
};

const filterPrice = ({offer}) => {
  if (housingPrice.value !== 'any') {
    if (housingPrice.value === 'low' && offer.price <= 10000) {
      return true;
    }
    if (housingPrice.value === 'middle' && (offer.price > 10000 && offer.price < 50000)) {
      return true;
    }
    if (housingPrice.value === 'high' && offer.price >= 50000) {
      return true;
    }
  }
  return true;
};

const filterRooms = ({offer}) => {
  if (housingRooms.value !== 'any') {
    return parseFloat(housingRooms.value) === offer.rooms;
  }
  return true;
};

const filterGuests = ({offer}) => {
  if (housingGuests.value !== 'any') {
    return parseFloat(housingGuests.value) === offer.guests;
  }
  return true;
};

const checkAdFeatures = (featuresList, feature) => {
  for (let i = 0; i < featuresList.length; i++) {
    if (featuresList[i] === feature) {
      return true;
    }
  }
  return false;
};

const checkWifi = ({offer}) => {
  if (featureWifi.checked) {
    return offer.features && checkAdFeatures(offer.features, featureWifi.value);
  }
  return true;
};

const checkDishwasher = ({offer}) => {
  if (featureDishwasher.checked) {
    return offer.features && checkAdFeatures(offer.features, featureDishwasher.value);
  }
  return true;
};

const checkParking = ({offer}) => {
  if (featureParking.checked) {
    return offer.features && checkAdFeatures(offer.features, featureParking.value);
  }
  return true;
};

const checkWasher = ({offer}) => {
  if (featureWasher.checked) {
    return offer.features && checkAdFeatures(offer.features, featureWasher.value);
  }
  return true;
};

const checkElevator = ({offer}) => {
  if (featureElevator.checked) {
    return offer.features && checkAdFeatures(offer.features, featureElevator.value);
  }
  return true;
};

const checkConditioner = ({offer}) => {
  if (featureConditioner.checked) {
    return offer.features && checkAdFeatures(offer.features, featureConditioner.value);
  }
  return true;
};


export {
  filterType,
  filterPrice,
  filterRooms,
  filterGuests,
  checkWifi,
  checkDishwasher,
  checkParking,
  checkWasher,
  checkElevator,
  checkConditioner
};
