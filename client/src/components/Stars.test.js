import { render, screen } from '@testing-library/react';
import Stars from './Stars';
test('render 3 stars', () => {
  render(<Stars value={3} editable={false} />);
  const active = screen.getAllByTestId('active');
  expect(active).toHaveLength(6);
});
test('render 3.5 stars', () => {
  render(<Stars value={3.5} editable={false} />);
  const active = screen.getAllByTestId('active');
  expect(active).toHaveLength(7);
});
test('render 3.99 stars with 3.99 value', () => {
  render(<Stars value={3.6} editable={false} />);
  const active = screen.getAllByTestId('active');
  expect(active).toHaveLength(7);
});
