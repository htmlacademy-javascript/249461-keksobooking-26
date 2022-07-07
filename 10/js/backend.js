import {showAlertError} from './util.js';

const GET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = (showAds) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .then((adsList) => {
      showAds(adsList);
    })
    .catch((err) => {
      showAlertError(err);
    });
};

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
  getData,
  setData
};
