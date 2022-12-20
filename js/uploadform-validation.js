import {checkMaxLength} from './utils.js';


const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;
const REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');
const uploadFormSubmitButtonElement = imgUploadForm.querySelector('.img-upload__submit');


export const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const makeHashtagsArr = (value) => {
  const hashtags = value.toLowerCase().split(/[\s,]+/);
  hashtags.forEach((item, index, obj) => {
    if (item === ''){
      obj.splice(index, 1);
    }
  });
  return hashtags;
};

const validateDescription = (value) => checkMaxLength(value, MAX_DESCRIPTION_LENGTH);

const validateHashtagsLength = (value) => makeHashtagsArr(value).length <= MAX_HASHTAGS_LENGTH;

const validateHashtagUniqueness = (value) => {
  const hashtags = makeHashtagsArr(value);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagFormat = (value) => {
  const hashtags = makeHashtagsArr(value);
  if (hashtags[0] === '') {
    return true;
  }
  else {
    return hashtags.every((hashtag) => REGEX.test(hashtag));
  }
};

export const validateForm = () => {
  const description = textDescriptionInput.value;
  const hashtags = textHashtagsInput.value;
  uploadFormSubmitButtonElement.disabled = !(validateHashtagFormat(hashtags) && validateHashtagUniqueness(hashtags) &&
    validateHashtagsLength(hashtags) && validateDescription(description));
};

pristine.addValidator(
  textDescriptionInput,
  validateDescription,
  'Не более 140 символов'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagsLength,
  'Не больше 5 хэштегов'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagUniqueness,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagFormat,
  'Формат: #hashtag, длина не более 20 символов. Хэштеги разделены пробелами'
);
