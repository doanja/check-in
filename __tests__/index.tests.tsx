import { render } from '@testing-library/react';
import Home from '../pages/index';

describe('App', () => {
  it('renders Home without crashing', () => {
    const home = render(<Home />);

    const heading = home.getByText('Home');

    expect(heading).toBeInTheDocument();
  });
});

// import { render } from '@testing-library/react';

// function SomeComp() {
//   return <div>Hello</div>;
// }

// describe('SomeComp', () => {
//   it('renders Hello', () => {
//     const { getByText } = render(<SomeComp />);
//     expect(getByText('Hello')).toBeInTheDocument();
//   });
// });
