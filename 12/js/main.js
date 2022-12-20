import {getData} from './server.js';
import {renderPictures, renderLoadError} from './pictures_gallery.js';
import {getDataForFilters, showFilters, useFilters} from './filters.js';
import './loaderform-image.js';

getData((photos) => {
  renderPictures(photos);
  getDataForFilters(photos);
  showFilters();
  useFilters();
},
() => {
  renderLoadError('Не удалось загрузить фотографии');
});
