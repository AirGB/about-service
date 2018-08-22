const fs = require('fs');

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const genReviews = () => {
  console.log('generating reviews!');
  const out = fs.createWriteStream('./artillery-reviews.csv');
  for (let i = 10000025; i < 12000026; i += 1) {
    out.write(`${i}, ${getRandomNumber(9800000, 10000000)},${getRandomNumber(9800000, 10000000)},${getRandomNumber(1, 5)}\n`, 'utf-8');
  }
  out.end();
};

genReviews();
