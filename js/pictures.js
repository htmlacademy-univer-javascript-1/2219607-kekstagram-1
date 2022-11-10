import {arrayObjects} from './photos.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const dataFragment = document.createDocumentFragment();

const createPicture = (userData) => {
  userData.forEach(({url, likes, comments}) => {
    const userPicture = pictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    dataFragment.append(userPicture);
  } );
  picturesContainer.append(dataFragment);
  return picturesContainer;
};

createPicture(arrayObjects);
