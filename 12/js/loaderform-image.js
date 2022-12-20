import {openModal, closeModal, isEscapeKey} from './utils.js';
import {pristine, validateForm} from './uploadform-validation.js';
import {controlScaleButtonHandler, getScaleDecrease, getScaleIncrease,
  scaleControlBiggerElement, scaleControlSmallerElement, resetScaleSettings} from './image_scale.js';
import {enableEffectPreview, disableEffectPreview, resetEffect, picture} from './picture_effects.js';
import {sendData} from './server.js';


const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeButton = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');
const uploadFormSubmitButtonElement = imgUploadForm.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('section');
const errorTemplate = document.querySelector('#error').content.querySelector('section');

const propagationStopper = (evt) => evt.stopPropagation();

const closeOverlay = () => {
  closeModal(imgUploadOverlay, body);
  closeButton.removeEventListener('click', closeButtonListener);
  document.removeEventListener('keydown', escListener);
  textHashtagsInput.removeEventListener('keydown', propagationStopper);
  textDescriptionInput.removeEventListener('keydown', propagationStopper);
  resetScaleSettings();
  disableEffectPreview();
};

function closeButtonListener() {
  closeOverlay();
  resetEffect();
}

function escListener(evt) {
  if (isEscapeKey(evt)) {
    closeOverlay();
    resetEffect();
  }
}

const blockSubmitButton = () => {
  uploadFormSubmitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  uploadFormSubmitButtonElement.disabled = false;
};

const openOrCloseMessage = (message) => {
  body.appendChild(message);
  document.addEventListener('keydown', closeByEsc);
  message.addEventListener('click', alertClickHandler);
  const closeMessage = () => {
    message.removeEventListener('click', alertClickHandler);
    message.remove();
    document.removeEventListener('keydown', closeByEsc);
  };
  function alertClickHandler(evt) {
    if (evt.target.tagName !== 'DIV' && evt.target.tagName !== 'H2'){
      closeMessage();
    }
  }
  function closeByEsc(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }
};

const showErrorMessageModal = () => {
  const message = errorTemplate.cloneNode(true);
  openOrCloseMessage(message);
};

const showSuccessMessageModal = () => {
  const message = successTemplate.cloneNode(true);
  openOrCloseMessage(message);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData (
      () => {
        unblockSubmitButton();
        closeOverlay();
        showSuccessMessageModal();
        resetEffect();
      },
      () => {
        showErrorMessageModal();
        closeOverlay();
        unblockSubmitButton();
        uploadFile.value = '';
      },
      new FormData(imgUploadForm)
    );
  }
};

const renderImageEditor = () => {
  openModal(imgUploadOverlay, body);
  textHashtagsInput.addEventListener('keydown', propagationStopper);
  textHashtagsInput.addEventListener('input', validateForm);
  textDescriptionInput.addEventListener('keydown', propagationStopper);
  closeButton.addEventListener('click', closeButtonListener);
  document.addEventListener('keydown', escListener);
  imgUploadForm.addEventListener('submit', formSubmitHandler);
  controlScaleButtonHandler(scaleControlSmallerElement, getScaleDecrease);
  controlScaleButtonHandler(scaleControlBiggerElement, getScaleIncrease);
  enableEffectPreview();
};

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((type) => fileName.endsWith(type))) {
    picture.src = URL.createObjectURL(file);
    renderImageEditor();
  }
  else {
    showErrorMessageModal();
  }
});
