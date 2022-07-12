const filtersForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

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

  formFields.push(...inputFields);
  formFields.push(...selectFields);
  formFields.push(...textareaFields);

  return formFields;
};

/**
 * Отключает или включает поля формы в зависимости от переданного параметра
 * @param disabled boolean true / false
 */
const deactivateForms = (disabled) => {
  if (disabled === true) {
    filtersForm.classList.add('map__filters--disabled');
    adForm.classList.add('ad-form--disabled');
  } else {
    filtersForm.classList.remove('map__filters--disabled');
    adForm.classList.remove('ad-form--disabled');
  }

  const forms = [];
  forms.push(...filtersForm);
  forms.push(...adForm);

  forms.forEach((form) => {
    getFormFields(form).forEach((field) => {
      field.disabled = disabled;
    });
  });
};

deactivateForms(true);

export {
  deactivateForms
};
