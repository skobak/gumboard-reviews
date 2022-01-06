export const getRate = (arrayOfScores) => {
  const sum = arrayOfScores.reduce((acc, curr) => acc + curr, 0);
  const rate = sum / arrayOfScores.length;
  return rate;
};
