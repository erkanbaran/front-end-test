import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SearchBarComponent from './search-bar.component';

describe('SearchBar Component', () => {
  it('should have submit button', () => {
    render(<SearchBarComponent />);

    const button = screen.getByRole('submit', {
      name: /Find Holidays/i,
    });

    expect(button).toBeInTheDocument();
  });
});