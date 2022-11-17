export const getRandom = (start, end) => {
  if (start < 0 || end < 0) {
    return -1;
  }
  if (start < end) {
    [start, end] = [end, start];
  }
  const rand = start + Math.random() * (end - start);
  return Math.round(rand);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
