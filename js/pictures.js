import {arrayObjects} from './photos.js';

export const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const dataFragment = document.createDocumentFragment();

const createPicture = (userData) => {
  userData.forEach((picture) => {
    const userPicture = pictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = picture.url;
    userPicture.querySelector('.picture__likes').textContent = picture.likes;
    userPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    dataFragment.append(userPicture);
  } );
  picturesContainer.append(dataFragment);
  return picturesContainer;
};

createPicture(arrayObjects);
