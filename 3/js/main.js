const COUNT_OBJECTS = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const NAME = [
  'Рейнира',
  'Дейман',
  'Мортимер Смит',
  'Дейнерис Бурерожденная из дома Таргариенов, законная наследница Железного Трона',
  'Эола Лоуренс'
];

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = ['Жизнь похожа на фотографию. Мы развиваемся только из негативов.',
  'Это моя жизнь, и мне так повезло ее жить.',
  'Здесь должна быть какая-нибудь юморная подпись, но мне сегодня лень.',
  'Каждый день не может быть хорошим, но в каждом из них может быть что-то хорошее.',
  '75% моего юмора начинается с плохой фотографии.'
];

const arrayObjects = [];


const getRandom = (start, end) => {
  if (start < 0 || end < 0) {
    return -1;
  }
  if (start < end) {
    [start, end] = [end, start];
  }
  const rand = start + Math.random() * (end - start);
  return Math.round(rand);
};

const commentsArray = (count) => {
  const array = [];
  for (let i = 0; i < count; i++){
    array.push({
      id: i,
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: MESSAGES[getRandom(0, MESSAGES.length - 1)],
      name: NAME[getRandom(0, NAME.length - 1)]
    });
  }
  return array;
};

const addPhotos = () => {
  for(let i = 0; i < COUNT_OBJECTS; i++){
    arrayObjects.push({
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: DESCRIPTIONS[getRandom(0, DESCRIPTIONS.length - 1)],
      likes: getRandom(MIN_LIKES, MAX_LIKES),
      comments: commentsArray(getRandom(0, 2))
    });
  }
};

addPhotos();
