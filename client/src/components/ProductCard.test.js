import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductCard from './ProductCard';

const testReviews = [
  {
    rating: 5,
    text: 'Great product',
  },
  {
    rating: 1,
    text: 'Bad product',
  },
];

test('render product card title', () => {
  render(<ProductCard name="Test Product" reviews={testReviews} />);
  const titleElement = screen.getByText(/Test Product/i);
  expect(titleElement).toBeInTheDocument();
});

test('Product card rate calculation', () => {
  render(<ProductCard name="Test Product" reviews={testReviews} />);
  const avgRatingElement = screen.getByText(/3/i);
  expect(avgRatingElement).toBeInTheDocument();
});
