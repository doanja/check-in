import React from 'react';
import { render } from '@testing-library/react';
import Home from '@pages/index';

describe('App', () => {
  it('renders Home without crashing', () => {
    const home = render(<Home />);

    const heading = home.getByText('Home');

    expect(heading).toBeInTheDocument();
  });
});
