import React from 'react';
import App from '../../../components/main/App'
import AppRouter from '../../../components/main/AppRouter';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test('renders the Router component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(AppRouter).length).toBe(1);
});
