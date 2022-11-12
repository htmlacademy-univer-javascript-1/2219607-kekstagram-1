import {arrayObjects} from './photos.js';
import {picturesContainer} from './pictures.js';

const bigPicture = document.querySelector('.big-picture');
const fullSizePictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('span.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const photoDescription = bigPicture.querySelector('.social__caption');
const socialCommentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bodyContainer = document.querySelector('body');

const getClosedByKeyPicture = (evt) => {
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    bodyContainer.classList.remove('modal-open');
  }
};

const removeCommentsCounterAndLoader= () => {
  socialCommentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

function closeBigPicture () {
  bodyContainer.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}

const removeDefaultSocialComments = () => {
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.lastChild);
  }
};

const makeElementTemplate = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const createSocialCommentsTemplate = (data) => {
  const socialComment = makeElementTemplate('li', 'social__comment');
  const avatarImage = makeElementTemplate('img', 'social__picture');
  avatarImage.src = data.avatar;
  avatarImage.alt = data.name;
  avatarImage.width = '35';
  avatarImage.height = '35';
  socialComment.append(avatarImage);
  const paragraphElement = makeElementTemplate('p', 'social__text');
  paragraphElement.textContent = data.message;
  socialComment.append(paragraphElement);
  return socialComment;
};

const getComment = (dataPicture) => {
  const actualComments = dataPicture.comments;
  if (actualComments.length === 0) {
    commentsCount.textContent = '0';
  }
  else {
    commentsCount.textContent = String(actualComments.length);
    const commentFragment = document.createDocumentFragment();
    actualComments.forEach((comment) => commentFragment.append(createSocialCommentsTemplate(comment)));
    socialComments.append(commentFragment);
  }
};

const getIndex = (data, picUrl) => {
  let ind = 0;
  data.forEach((item) => {
    if (item.url === picUrl){
      ind = item.id;
    }});
  return ind;
};

const getBigPicture = (evt) => {
  const selectedPost = evt.target.getAttribute('src');
  const currentIndex = getIndex(arrayObjects, selectedPost);
  const actualPicture = arrayObjects[currentIndex];
  likesCount.textContent = String(actualPicture.likes);
  photoDescription.textContent = actualPicture.description;
  fullSizePictureImage.src = actualPicture.url;
  getComment(actualPicture);
};

const openBigPicture = (evt) => {
  const clickedElement = evt.target;
  if (!clickedElement.closest('img')) {
    return;
  }
  bigPicture.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', getClosedByKeyPicture);
  removeCommentsCounterAndLoader();
  removeDefaultSocialComments();
  getBigPicture(evt);
};

picturesContainer.addEventListener('click', openBigPicture);
