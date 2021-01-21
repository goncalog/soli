import React from 'react';
import Projects from '../../../components/main/Projects';
import Filters from '../../../components/support/Filters';
import ProjectsContainer from '../../../components/support/ProjectsContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Projects', () => {
    let shallowProjects;
    let props;
    const projects = () => {
        if (!shallowProjects) {
            shallowProjects = shallow(<Projects {...props}/>);
        }
        return shallowProjects;
    }

    // This reset the props and the shallowProjects variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowProjects to undefined here, when the next test runs, 
    // if it calls projects, a new Projects will be created
    beforeEach(() => {
        props = {
            fetchUrl: 'Text to test the fetchUrl property',
        }
        shallowProjects = undefined;
    });

    // The default test environment for Jest is a browser-like environment provided by jsdom,
    // which implements most of what an actual browser would provide, but it doesn't implement everything.
    // Specifically, jsdom doesn't implement window.scrollTo, and instead throws an Error.
    const jsdomScrollTo = window.scrollTo;  // remember the jsdom scrollTo
    beforeAll(() => {
        window.scrollTo = jest.fn(); // provide a mock implementation for window.scrollTo
    });

    afterAll(() => {
        window.scrollTo = jsdomScrollTo; // restore the jsdom scrollTo
    });

    test('has 2 children', () => {
        expect(projects().children().length).toEqual(2);
    });

    test('has one Filters component rendered with passed properties', () => {
        const shallowWrapper = projects().find(Filters);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('return');
        expect(Object.keys(shallowWrapper.props())).toContain('location');
        expect(Object.keys(shallowWrapper.props())).toContain('size');
        expect(Object.keys(shallowWrapper.props())).toContain('status');
        expect(Object.keys(shallowWrapper.props())).toContain('sort');
        expect(Object.keys(shallowWrapper.props())).toContain('visibility');
        expect(Object.keys(shallowWrapper.props())).toContain('onClick');
        expect(Object.keys(shallowWrapper.props())).toContain('onTextChange');
        expect(Object.keys(shallowWrapper.props())).toContain('onOptionChange');
    });

    test('has one ProjectsContainer component rendered with passed properties', () => {
        const shallowWrapper = projects().find(ProjectsContainer);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('projects');
    });    
});
