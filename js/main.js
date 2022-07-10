import {getData} from './backend.js';
import './popup.js';
import {showFilteredAds} from './map.js';
import './forms.js';
import './form-ad-validation.js';
import './form-slider.js';
import './filters.js';

const filtersForm = document.querySelector('.map__filters');
const setFilterClick = (cb) => {
  filtersForm.addEventListener('change', (evt) => {
    const filter = evt.target;

    if (filter.tagName === 'SELECT') {
      cb();
    }

    if (filter.tagName === 'INPUT') {
      cb();
    }
  });
};

getData((ads) => {
  showFilteredAds(ads);
  setFilterClick(() => showFilteredAds(ads));
});
