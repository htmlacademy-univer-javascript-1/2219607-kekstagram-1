import {getBigPicture} from './big-pictures.js';

export const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const dataFragment = document.createDocumentFragment();

const createPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    getBigPicture(picture);
  });
  return pictureElement;
};

export const renderPictures = (userData) => {
  userData.forEach((item) => {
    dataFragment.append(createPicture(item));
  });
  picturesContainer.append(dataFragment);
};

export const renderLoadError = (message) => {
  const error = document.createElement('div');
  error.classList.add('error-load');
  error.textContent = message;
  picturesContainer.appendChild(error);
};
