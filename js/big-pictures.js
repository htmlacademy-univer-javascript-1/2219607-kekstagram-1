import {isEscapeKey} from './utils.js';


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

const getClosedByEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
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
  const AVATAR_WIDTH = '35';
  const AVATAR_HEIGHT = '35';
  const socialComment = makeElementTemplate('li', 'social__comment');
  const avatarImage = makeElementTemplate('img', 'social__picture');
  avatarImage.src = data.avatar;
  avatarImage.alt = data.name;
  avatarImage.width = AVATAR_WIDTH;
  avatarImage.height = AVATAR_HEIGHT;
  socialComment.append(avatarImage);
  const paragraphElement = makeElementTemplate('p', 'social__text');
  paragraphElement.textContent = data.message;
  socialComment.appendChild(paragraphElement);
  return socialComment;
};

const getComment = (comments) => {
  if (comments.length === 0) {
    commentsCount.textContent = '0';
  }
  else {
    commentsCount.textContent = comments.length;
    const commentFragment = document.createDocumentFragment();
    comments.forEach((comment) => commentFragment.append(createSocialCommentsTemplate(comment)));
    socialComments.append(commentFragment);
  }
};

export const getBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', getClosedByEscape);
  removeCommentsCounterAndLoader();
  removeDefaultSocialComments();
  likesCount.textContent = picture.likes;
  photoDescription.textContent = picture.description;
  fullSizePictureImage.src = picture.url;
  getComment(picture.comments);
};


