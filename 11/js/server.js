const FROM_SERVER_DATA = 'https://26.javascript.pages.academy/kekstagram/data';
const TO_SERVER_DATA = 'https://26.javascript.pages.academy/kekstagram';


export const getData = (onSuccess, onFail) => {
  fetch(FROM_SERVER_DATA)
    .then( (response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then( (pictures) => {
      onSuccess(pictures);
    })
    .catch( () => {
      onFail('Извините, не удалось получить данные. Попробуйте перезагрузить страницу');
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    TO_SERVER_DATA,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Ошибка отправки формы. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Ошибка отправки формы. Попробуйте ещё раз');
    });
};
