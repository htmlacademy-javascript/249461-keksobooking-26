const ALERT_SHOW_TIME = 5000;

/*
* Блок для показа ошибок при обмене информации с сервером
* */
const showAlertError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const messageSuccess = document.querySelector('#success').content.querySelector('.success');
const messageError = document.querySelector('#error').content.querySelector('.error');
const messageErrorCloseBtn = messageError.querySelector('.error__button');

const isEscapeKey = (evt) => evt.key === 'Escape';

/* Success Message */
const onMessageSuccessEscClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageSuccess();
  }
};

const showMessageSuccess = () => {
  document.body.append(messageSuccess);
  document.addEventListener('keydown', onMessageSuccessEscClose);
  messageSuccess.addEventListener('click', closeMessageSuccess);
};

function closeMessageSuccess() {
  messageSuccess.remove();
  document.removeEventListener('keydown', onMessageSuccessEscClose);
}

/* Success Message */

/* Error Message */
const onMessageErrorEscClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageError();
  }
};

const showMessageError = () => {
  document.body.append(messageError);
  document.addEventListener('keydown', onMessageErrorEscClose);
  messageErrorCloseBtn.addEventListener('click', closeMessageError);
};

function closeMessageError() {
  messageError.remove();
  document.removeEventListener('keydown', onMessageErrorEscClose);
}

/* Error Message */


export {
  showAlertError,
  showMessageSuccess,
  showMessageError
};
