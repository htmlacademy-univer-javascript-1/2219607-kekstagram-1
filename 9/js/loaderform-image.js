import {openModal, closeModal, isEscapeKey} from './utils.js';
import {pristine, validateForm} from './uploadform-validation.js';
import {controlScaleButtonHandler, getScaleDecrease, getScaleIncrease,
  scaleControlBiggerElement, scaleControlSmallerElement, resetScaleSettings} from './image_scale.js';
import {enableEffectPreview, disableEffectPreview} from './effects.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeButton = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');

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

const renderImageEditor = () => {
  openModal(imgUploadOverlay, body);
  textHashtagsInput.addEventListener('keydown', propagationStopper);
  textHashtagsInput.addEventListener('input', validateForm);
  textDescriptionInput.addEventListener('keydown', propagationStopper);
  closeButton.addEventListener('click', closeButtonListener);
  document.addEventListener('keydown', escListener);
  controlScaleButtonHandler(scaleControlSmallerElement, getScaleDecrease);
  controlScaleButtonHandler(scaleControlBiggerElement, getScaleIncrease);
  enableEffectPreview();
};

function closeButtonListener() {
  closeOverlay();
}

function escListener(evt) {
  if (isEscapeKey(evt)) {
    imgUploadForm.reset();
    closeOverlay();
  }
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
  }
});

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  renderImageEditor();
});
