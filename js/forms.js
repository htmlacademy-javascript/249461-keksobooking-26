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
 * @param formClass класс формы которую необходимо заблокировать/разблокировать
 * @param disabled boolean true / false
 */
const deactivateForm = (formClass, disabled) => {
  const form = document.querySelector(`${formClass}`);
  if (disabled === true) {
    form.classList.add(`${formClass}--disabled`);
  } else {
    form.classList.remove(`${formClass}--disabled`);
  }

  getFormFields(form).forEach((field) => {
    field.disabled = disabled;
  });
};

deactivateForm('.map__filters', true);
deactivateForm('.ad-form', true);

export {
  deactivateForm
};
