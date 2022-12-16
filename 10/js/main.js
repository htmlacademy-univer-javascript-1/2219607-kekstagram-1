import {getData} from './server.js';
import {renderPictures, renderLoadError} from './pictures_gallery.js';
import './loaderform-image.js';

getData((photos) => {
  renderPictures(photos);
},
() => {
  renderLoadError('Не удалось загрузить фотографии');
});
