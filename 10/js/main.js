import {getData} from './backend.js';
import './popup.js';
import {showSimilarAds} from './map.js';
import './forms.js';
import './form-ad-validation.js';
import './form-slider.js';

const ADS_COUNTER = 10;

getData((ads) => {
  showSimilarAds(ads.slice(0, ADS_COUNTER));
});
