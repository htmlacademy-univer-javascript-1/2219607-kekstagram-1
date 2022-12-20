export const isEscapeKey = (evt) => evt.key === 'Escape';

export const checkMaxLength = (data, num) => data.length <= num;

export const openModal = (modal, parent) => {
  modal.classList.remove('hidden');
  parent.classList.add('modal-open');
};

export const closeModal = (modal, parent) => {
  modal.classList.add('hidden');
  parent.classList.remove('modal-open');
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const shuffle = (arr) => {
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--) {
    j = Math.floor( Math.random() * (i + 1) );
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};
