import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Quiz from './quiz';

jest.mock('axios');

describe('Quiz Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders quiz and handles form submission', async () => {
    const jwt = 'fake-jwt-token';

    axios.post.mockResolvedValue({ data: { access_token: 'fake-access-token' } });

    render(<Quiz jwt={jwt} />);

    expect(screen.getByText('Create your custom quiz')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('firstname'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('lastname'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('email@email.com'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('********')[1], {
      target: { value: 'password' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'REGISTER' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Congratulations, the quiz is over')).toBeInTheDocument();
  });

  it('handles answer submission in quiz', async () => {
    const jwt = 'fake-jwt-token';
    const quizData = {
      id: 1,
      title: 'Sample Quiz',
      level_name: 'Easy',
      questions: [
        {
          id: 1,
          title: 'Question 1',
          answers: [
            { id: 1, answer: 'Answer 1', correct_answer: true },
            { id: 2, answer: 'Answer 2', correct_answer: false },
          ],
        },
      ],
    };

    render(<Quiz jwt={jwt} quiz={{ data: [quizData] }} />);

    await screen.findByText('Sample Quiz');

    fireEvent.click(screen.getByText('Answer 1'));

    await waitFor(() => {
      expect(screen.getByText('CORRECT')).toBeInTheDocument();
    });
  });

  it('handles form submission error', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Error 403' } } });

    render(<Quiz />);

    fireEvent.submit(screen.getByRole('button', { name: 'REGISTER' }));

    await waitFor(() => {
      expect(screen.getByText('Error 403')).toBeInTheDocument();
    });
  });

  it('renders quiz or registration form based on current state', async () => {
    render(<Quiz quiz={{ data: [{ id: 1, questions: [{ id: 1, title: 'Question 1' }] }] }} />);

    await screen.findByText('Question 1');

    expect(screen.queryByText('Create your account')).toBeNull();
  });
});
