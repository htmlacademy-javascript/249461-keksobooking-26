import {priceField, priceRangeSlider} from './forms.js';

noUiSlider.create(priceRangeSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value).toFixed(1)
  },
});


priceRangeSlider.noUiSlider.on('update', () => {
  priceField.value = priceRangeSlider.noUiSlider.get();
});

priceField.addEventListener('change', (evt) => {
  priceRangeSlider.noUiSlider.set(evt.target.value);
});

export {
  priceRangeSlider
};
