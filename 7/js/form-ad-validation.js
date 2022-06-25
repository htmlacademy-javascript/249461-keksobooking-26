import {adForm} from './forms.js';

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

const maxGuests = {
  1: 1,
  2: 2,
  3: 3,
  100: 0,
};

const checkGuestsCount = (guestsCount) => {
  const roomsCount = adForm.querySelector('#room_number').value;
  return guestsCount <= maxGuests[roomsCount];
};

const getGuestCountError = () => {
  const roomsCount = adForm.querySelector('#room_number').value;

  if (roomsCount === '100') {
    return 'Не для гостей';
  }

  return `Максимальное кол-во гостей: ${maxGuests[roomsCount]}`;
};

const guests = adForm.querySelector('#capacity');
pristine.addValidator(guests, checkGuestsCount, getGuestCountError);

const onRoomsChange = () => {
  pristine.validate(guests);
};

const rooms = adForm.querySelector('#room_number');
rooms.addEventListener('change', onRoomsChange);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // All is OK, send form
    // Show success message
  } else {
    // You need fix mistakes;
    // Show error message
  }
});
