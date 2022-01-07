/**
 *  Utils for general use basic Business logic calculations
 *
 */

const calculateAvgRate = (arrayOfScores) => {
  if (!arrayOfScores || arrayOfScores.length === 0) return 0;
  const sum = arrayOfScores.reduce((acc, curr) => acc + curr, 0);
  const rate = sum / arrayOfScores.length;
  return rate;
};

const formatRating = (rating) => {
  if (!rating) return '0.0';
  return rating.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
};

export { calculateAvgRate, formatRating };
