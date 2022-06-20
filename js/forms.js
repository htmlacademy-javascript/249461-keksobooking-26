/**
 * Формериует список полей формы
 * @param form форма внутри которой необходиом найти все поля
 * @returns {*[]} Массив всех полей которые были в формах
 */
const getFormFields = (form) => {
  const inputFields = form.querySelectorAll('input');
  const selectFields = form.querySelectorAll('select');
  const textareaFields = form.querySelectorAll('textarea');

  const formFields = [];

  formFields.push.apply(formFields, inputFields);
  formFields.push.apply(formFields, selectFields);
  formFields.push.apply(formFields, textareaFields);

  return formFields;
};

/**
 * Получает массив с формами и добавляет класс который отключает форму
 * и добавляет всем полям формы аттрибут disabled
 */
const disableForms = () => {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.classList.add('ad-form--disabled');

    getFormFields(form).forEach((field) => {
      field.disabled = true;
    });
  });
};

disableForms();

/**
 * Активация форм когда страница полностью загружена и готова к работе
 */
const activateForms = () => {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.classList.remove('ad-form--disabled');

    getFormFields(form).forEach((field) => {
      field.disabled = false;
    });
  });
};

/* Позже вызов будет проиходить после загрузки карты, а пока по окончанию загрузки страницы */
document.addEventListener('load', activateForms);
