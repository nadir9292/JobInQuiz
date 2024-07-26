import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login';
import { AppContext } from '../src/components/AppContext';
import { BrowserRouter as Router } from 'react-router-dom';

const mockContextValue = {
  jwt: null,
  logout: jest.fn(),
  saveJwt: jest.fn(),
  isError: false,
  changeIsError: jest.fn(),
  myProfile: {},
  isLightMode: true,
  toggleLightMode: jest.fn(),
};

test('renders login form', () => {
  render(
    <Router>
      <AppContext.Provider value={mockContextValue}>
        <Login />
      </AppContext.Provider>
    </Router>
  );

  expect(screen.getByPlaceholderText(/name@mail.com/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/********/i)).toBeInTheDocument();
});

test('submits form with email and password', () => {
  render(
    <Router>
      <AppContext.Provider value={mockContextValue}>
        <Login />
      </AppContext.Provider>
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/name@mail.com/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/********/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
});
