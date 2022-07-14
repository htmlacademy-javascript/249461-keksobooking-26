import {showAlertError} from './util.js';
import {deactivateForm} from './forms.js';

const GET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = () =>
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        deactivateForm('.map__filters', false);
        return response.json();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .catch((err) => {
      showAlertError(err);
    });

const advertsPromise = getData();

const setData = (onSuccess, onError, body) => {
  fetch(SET_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch((err) => {
      showAlertError(err);
    });
};

export {
  advertsPromise,
  setData
};
