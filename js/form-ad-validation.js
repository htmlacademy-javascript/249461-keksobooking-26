import {setData} from './backend.js';
import {showMessageSuccess, showMessageError} from './util.js';
import {setDefaultAddress, resetFilters} from './map.js';
import {resetAdPhoto, resetAvatar} from './upload-photos.js';

const ROOMS_WITHOUT_GUESTS = '100';
const NO_GUESTS = '0';

const MinApartmentPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const priceField = adForm.querySelector('#price');

const roomsCount = adForm.querySelector('#room_number');
const apartmentType = adForm.querySelector('#type');


const priceRangeSlider = adForm.querySelector('.ad-form__slider');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

const checkGuestsCount = (guestsCount) => {
  const roomsCountValue = roomsCount.value;
  if (roomsCountValue === ROOMS_WITHOUT_GUESTS || guestsCount === NO_GUESTS) {
    return roomsCountValue === ROOMS_WITHOUT_GUESTS && guestsCount === NO_GUESTS;
  }

  return guestsCount <= roomsCountValue;
};

const getGuestCountError = () => {
  const roomsCountValue = roomsCount.value;
  if (roomsCountValue === ROOMS_WITHOUT_GUESTS) {
    return 'Не для гостей';
  }

  return `Максимальное кол-во гостей: ${roomsCountValue}`;
};

const guests = adForm.querySelector('#capacity');
pristine.addValidator(guests, checkGuestsCount, getGuestCountError);

const onRoomsChange = () => {
  pristine.validate(guests);
};

const rooms = adForm.querySelector('#room_number');

rooms.addEventListener('change', onRoomsChange);


const checkAmount = (price) => {
  const apartmentTypeValue = apartmentType.value;
  return parseInt(price, 10) >= MinApartmentPrice[apartmentTypeValue];
};

const getAmountError = () => {
  const apartmentTypeValue = apartmentType.value;
  return `Минимальная цена: ${MinApartmentPrice[apartmentTypeValue]}`;
};

pristine.addValidator(priceField, checkAmount, getAmountError);

const types = adForm.querySelector('#type');
const onTypesChange = () => {
  priceField.placeholder = MinApartmentPrice[types.value];
  pristine.validate(priceField);
};

types.addEventListener('change', onTypesChange);


const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

timeIn.addEventListener('change',  () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change',  () => {
  timeIn.value = timeOut.value;
});


const submitButton = adForm.querySelector('.ad-form__submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    setData(
      () => {
        showMessageSuccess();
        adForm.reset();
        priceRangeSlider.noUiSlider.set(0);
        setDefaultAddress();
        unblockSubmitButton();
      },
      () => {
        showMessageError();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );

    resetFilters();
    resetAdPhoto();
    resetAvatar();
  }
});
