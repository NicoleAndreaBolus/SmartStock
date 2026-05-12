import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SmartStock login screen by default', () => {
  render(<App />);

  expect(screen.getByText(/smartstock/i)).toBeInTheDocument();
  expect(screen.getByText(/sign in to continue to your dashboard/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
