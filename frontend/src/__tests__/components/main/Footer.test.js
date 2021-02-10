import React from 'react';
import Footer from '../../../components/main/Footer';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders one child', () => {
    const wrapper = shallow(<Router><Footer /></Router>);
    expect(React.Children.count(wrapper.children())).toEqual(1);
});

it('renders Contact link correctly', () => {
    const { getByText } = render(<Router><Footer /></Router>);
    const link = getByText(/Contact/);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/contact');
});

it('renders Login link correctly', () => {
    const { getByText } = render(<Router><Footer /></Router>);
    const link = getByText(/Login/);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/user/login');
});

it('renders Signup link correctly', () => {
    const { getByText } = render(<Router><Footer /></Router>);
    const link = getByText(/Signup/);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/user/signup');
});

it('renders paragraph correctly', () => {
    const date = new Date();
    const year = date.getFullYear();
    const { getByText } = render(<Router><Footer /></Router>);
    const titleParagraph = getByText(year.toString(), { exact: false });
    expect(titleParagraph).toBeInTheDocument();
});
