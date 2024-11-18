import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect, vi } from 'vitest';
import ReviewPopUp from '../components/ReviewPopUp'; // Adjust the import path as needed
import { ADD_REVIEW } from '@/queries'; // Adjust the import path as needed

const mocks = [
  {
    request: {
      query: ADD_REVIEW,
      variables: {
        bookId: '1',
        name: 'John Doe',
        stars: 5,
        comment: 'Great book!',
      },
    },
    result: {
      data: {
        addReview: {
          __typename: 'Review',
          name: 'John Doe',
          stars: 5,
          comment: 'Great book!',
        },
      },
    },
  },
];

describe('ReviewPopUp Component', () => {
  it('renders the ReviewPopUp component', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewPopUp bookId="1" />
      </MockedProvider>
    );

    expect(screen.getByText('Give review')).toBeInTheDocument();
  });

  it('opens the popover when the trigger is clicked', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewPopUp bookId="1" />
      </MockedProvider>
    );

    const trigger = screen.getByText('Give review');
    userEvent.click(trigger);

    expect(screen.getByText('Give a review on this book!')).toBeInTheDocument();
  });

  it('submits the review form', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewPopUp bookId="1" />
      </MockedProvider>
    );

    const trigger = screen.getByText('Give review');
    userEvent.click(trigger);

    const nameInput = screen.getByPlaceholderText('Your name');
    const commentTextarea = screen.getByPlaceholderText('Leave a comment with your thoughts on this book');
    const star = screen.getAllByRole('button')[1]; // Assuming the stars are buttons
    const submitButton = screen.getByText('Submit');

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(commentTextarea, 'Great book!');
    userEvent.click(star);

    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);

    expect(await screen.findByText('Submitting...')).toBeInTheDocument();
  });
});