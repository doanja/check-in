import { render } from '@testing-library/react';
import Home from '../pages/index';

describe('App with react testing library', () => {
  it('renders Home without crashing', () => {
    const { getByText } = render(<Home />);

    getByText('Home');
  });
});

import { shallow } from 'enzyme';

describe('App With Enzyme', () => {
  it('renders Home without crashing', () => {
    shallow(<Home />);
  });

  it('Home text is displayed properly', () => {
    const wrapper = shallow(<Home />);

    const header = wrapper.find('h1').text();
    expect(header).toEqual('Home');
  });
});
