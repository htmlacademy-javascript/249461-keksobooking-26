import {advertsPromise} from './backend.js';
import './popup.js';
import {showFilteredAds} from './map.js';
import './forms.js';
import './form-ad-validation.js';
import './form-slider.js';
import {setFilterClick} from './filters.js';
import {debounce} from './util.js';
import './upload-photos.js';

const RERENDER_DELAY = 500;

advertsPromise.then((ads) => {
  showFilteredAds(ads);
  setFilterClick(debounce(
    () => showFilteredAds(ads),
    RERENDER_DELAY));
});
