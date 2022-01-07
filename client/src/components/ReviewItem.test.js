import { render, screen } from '@testing-library/react';
import ReviewItem from './ReviewItem';

const review = {
  rating: 5,
  text: 'Great product',
};

const reviewDataFormating = {
  rating: 2.5555555,
  text: 'bad proucct',
};

const reviewDataFormatingInt = {
  rating: 2,
  text: 'bad proucct',
};

test('render review comment', () => {
  render(<ReviewItem review={review} />);
  const titleElement = screen.getByText(/Great product/i);
  expect(titleElement).toBeInTheDocument();
});

test('number formating', () => {
  render(<ReviewItem review={reviewDataFormating} />);
  const rating = screen.getByTestId('rating');
  expect(rating.innerHTML).toBe('2.5');
});
test('number formating int', () => {
  render(<ReviewItem review={reviewDataFormatingInt} />);
  const rating = screen.getByTestId('rating');
  expect(rating.innerHTML).toBe('2');
});
