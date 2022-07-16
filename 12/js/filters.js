const filtersForm = document.querySelector('.map__filters');

const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = filtersForm.querySelector('#housing-features');

const DefaultSort = {
  HOUSING_TYPE: 'any',
  HOUSING_PRICE: 'any',
  HOUSING_ROOMS: 'any',
  HOUSING_GUESTS: 'any',
};

const PriceFilterStep = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};

const PriceFilterRange = {
  LOW: 10000,
  HIGH: 50000,
};

const setFilterClick = (cb) => {
  filtersForm.addEventListener('change', (evt) => {
    const filter = evt.target;

    if (filter.tagName === 'SELECT') {
      cb();
    }

    if (filter.tagName === 'INPUT') {
      cb();
    }
  });
};

const filterType = ({offer}) => {
  if (housingType.value !== DefaultSort.HOUSING_TYPE) {
    return housingType.value === offer.type;
  }
  return true;
};

const filterPrice = ({offer}) => {
  if (housingPrice.value !== DefaultSort.HOUSING_PRICE) {
    if (housingPrice.value === PriceFilterStep.LOW) {
      return offer.price <= PriceFilterRange.LOW;
    }
    if (housingPrice.value === PriceFilterStep.MIDDLE) {
      return (offer.price > PriceFilterRange.LOW && offer.price < PriceFilterRange.HIGH);
    }
    if (housingPrice.value === PriceFilterStep.HIGH) {
      return offer.price >= PriceFilterRange.HIGH;
    }
  }
  return true;
};

const filterRooms = ({offer}) => {
  if (housingRooms.value !== DefaultSort.HOUSING_ROOMS) {
    return parseFloat(housingRooms.value) === offer.rooms;
  }
  return true;
};

const filterGuests = ({offer}) => {
  if (housingGuests.value !== DefaultSort.HOUSING_GUESTS) {
    return parseFloat(housingGuests.value) === offer.guests;
  }
  return true;
};

const filterFeatures = ({offer}) => {
  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');

  if (checkedFeatures.length) {
    if (!offer.features || !offer.features.length) {
      return false;
    }
  } else {
    return true;
  }

  for (const input of checkedFeatures) {
    if (!offer.features.includes(input.value)) {
      return false;
    }
  }

  return true;
};


export {
  setFilterClick,
  filterType,
  filterPrice,
  filterRooms,
  filterGuests,
  filterFeatures,
};
