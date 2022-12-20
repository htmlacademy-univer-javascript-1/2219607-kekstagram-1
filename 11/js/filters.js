import {picturesContainer, renderPictures} from './pictures_gallery.js';
import {debounce, shuffle} from './utils.js';

const imgFiltersContainer = document.querySelector('.img-filters');
const imgFiltersForm = imgFiltersContainer.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('.img-filters__button');

const RANDOM_PICTURES_NUMBER = 10;

let photos;

export const getDataForFilters = (data) => {
  photos = data;
};

const removePictureNodesFromFilter = () => {
  const smallPictures = picturesContainer.querySelectorAll('a');
  smallPictures.forEach( (node) => node.remove() );
};

const imgFiltersButtonsChangeHandler = (evt) => {
  const currentButton = evt.target;
  const copyPhotos = photos.slice();
  const extraNum = photos.length - RANDOM_PICTURES_NUMBER;
  imgFiltersButtons.forEach( (btn) => btn.classList.remove('img-filters__button--active') );
  currentButton.classList.add('img-filters__button--active');
  switch (currentButton.id) {
    case 'filter-random':
      removePictureNodesFromFilter();
      debounce(renderPictures(shuffle(copyPhotos).slice(extraNum)));
      break;
    case 'filter-discussed':
      removePictureNodesFromFilter();
      debounce(renderPictures(copyPhotos.slice().sort((a,b) => b.comments.length - a.comments.length)));
      break;
    default:
      removePictureNodesFromFilter();
      debounce(renderPictures(photos));
      break;
  }
};

const imgFiltersButtonsHandler = () => {
  imgFiltersButtons.forEach( (button) => {
    button.addEventListener('click', imgFiltersButtonsChangeHandler);
  } );
};

export const showFilters = () => {
  imgFiltersContainer.classList.remove('img-filters--inactive');
};

export const useFilters = () => {
  imgFiltersButtonsHandler();
};
