const getRandomOf = (start, end) => {
  if (start < 0 || end < 0) {
    return -1;
  }
  if (start < end) {
    [start, end] = [end, start];
  }
  const rand = start + Math.random() * (end - start);
  return Math.round(rand);
};

const checkLengthString = (text, maxLength) => text.length <= maxLength;

