import React from 'react';
import Navigation from '../../../components/main/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders one child', () => {
    const wrapper = shallow(<Router><Navigation /></Router>);
    expect(React.Children.count(wrapper.children())).toEqual(1);
});

it('renders Title link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const titleLink = getByText(/Soli/);
    expect(titleLink).toBeInTheDocument();
    expect(titleLink.getAttribute('href')).toBe('/');
});

it('renders Home link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const homeLink = getByText(/Home/);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
});

it('renders the Invest link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const projectsLink = getByText(/Invest/);
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink.getAttribute('href')).toBe('/projects');
});

it('renders the Contact link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const contactLink = getByText(/Contact/);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.getAttribute('href')).toBe('/contact');
});

it('renders Log in link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const contactLink = getByText(/Login/);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.getAttribute('href')).toBe('/user/login');
});

it('renders the logo correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const titleLink = getByText(/Soli/);
    expect(titleLink.firstChild.getAttribute('class')).toBe('App-logo');
    expect(titleLink.firstChild.getAttribute('src')).toBe('logo.svg');
});
