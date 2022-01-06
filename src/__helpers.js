/**
 *  This file is for general purpose functions
 *
 */

const calculateAvgRate = (arrayOfScores) => {
  if (!arrayOfScores || arrayOfScores.length === 0) return 0;
  const sum = arrayOfScores.reduce((acc, curr) => acc + curr, 0);
  const rate = sum / arrayOfScores.length;
  return rate;
};

export default calculateAvgRate;
