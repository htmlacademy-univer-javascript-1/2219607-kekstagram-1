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

