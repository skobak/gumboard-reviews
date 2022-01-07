import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Review challenge v2/i);
  expect(titleElement).toBeInTheDocument();
});

test('render two top buttons', () => {
  render(<App />);
  const btnAddProduct = screen.getByText(/Add product/i);
  const btnHome = screen.getByText(/Home/i);
  expect(btnAddProduct).toBeInTheDocument();
  expect(btnHome).toBeInTheDocument();
});
