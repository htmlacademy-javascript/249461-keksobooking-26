const ALERT_SHOW_TIME = 10000;
const KEY_ESCAPE = 'Escape';

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

const isEscapeKey = (evt) => evt.key === KEY_ESCAPE;

/* Success Message */
const onMessageSuccessEscClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClickCloseMessageSuccess();
  }
};

const showMessageSuccess = () => {
  document.body.append(messageSuccess);
  document.addEventListener('keydown', onMessageSuccessEscClose);
  messageSuccess.addEventListener('click', onClickCloseMessageSuccess);
};

function onClickCloseMessageSuccess() {
  messageSuccess.remove();
  document.removeEventListener('keydown', onMessageSuccessEscClose);
}

/* Success Message */

/* Error Message */
const onMessageErrorEscClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClickCloseMessageError();
  }
};

const showMessageError = () => {
  document.body.append(messageError);
  document.addEventListener('keydown', onMessageErrorEscClose);
  messageErrorCloseBtn.addEventListener('click', onClickCloseMessageError);
};

function onClickCloseMessageError() {
  messageError.remove();
  document.removeEventListener('keydown', onMessageErrorEscClose);
}

/* Error Message */

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {
  showAlertError,
  showMessageSuccess,
  showMessageError,
  debounce
};
