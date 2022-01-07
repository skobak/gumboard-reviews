import { addReview } from '../db';

const Seed = async (productId) => {
  for (let i = 0; i < 10; i++) {
    let rating = Math.floor(Math.random() * 4) + 1;
    if (i % 2 === 0) {
      rating += 0.5;
    }
    console.log(rating);
    const text = `Review ${i}`;
    addReview(productId, rating, text);
  }
  return true;
};

export default Seed;
