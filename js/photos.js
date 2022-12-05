import {getRandom} from './utils.js';
import {COUNT_OBJECTS, commentsArray} from './comments.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const DESCRIPTIONS = ['Жизнь похожа на фотографию. Мы развиваемся только из негативов.',
  'Это моя жизнь, и мне так повезло ее жить.',
  'Здесь должна быть какая-нибудь юморная подпись, но мне сегодня лень.',
  'Каждый день не может быть хорошим, но в каждом из них может быть что-то хорошее.',
  '75% моего юмора начинается с плохой фотографии.'
];

export const arrayObjects = [];

export const addPhotos = () => {
  for(let i = 0; i < COUNT_OBJECTS; i++){
    arrayObjects.push({
      id: i,
      url: `./photos/${i + 1}.jpg`,
      description: DESCRIPTIONS[getRandom(1, DESCRIPTIONS.length - 1)],
      likes: getRandom(MIN_LIKES, MAX_LIKES),
      comments: commentsArray(getRandom(0, 4))
    });
  }
};
