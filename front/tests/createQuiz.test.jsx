import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateQuiz from './create-quiz';

jest.mock('axios');

describe('CreateQuiz Component', () => {
  it('renders form and handles form submission', async () => {
    const levelsData = {
      data: [
        { id: 1, name: 'Easy' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'Hard' },
      ],
    };
    const questionsData = {
      data: [
        { id: 1, title: 'Question 1' },
        { id: 2, title: 'Question 2' },
      ],
    };

    const jwt = 'fake-jwt-token';

    axios.post.mockResolvedValue({ data: { message: 'Quiz created successfully' } });

    render(<CreateQuiz jwt={jwt} levels={levelsData} questions={questionsData} />);

    expect(screen.getByText('Create your custom quiz')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'My Quiz' },
    });

    fireEvent.change(screen.getByLabelText('Difficulty'), {
      target: { value: 2 },
    });

    fireEvent.click(screen.getByText('Question 1'));

    fireEvent.submit(screen.getByRole('button', { name: 'Create your Quiz' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Quiz created successfully')).toBeInTheDocument();
  });
});
