import React from 'react';
import Dashboard from '../../../components/main/Dashboard';
import Image from '../../../components/support/Image';
import Grid from '../../../components/support/Grid';
import CallToActionButton from '../../../components/support/CallToActionButton';
import ProjectsContainer from '../../../components/support/ProjectsContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Dashboard', () => {
    let props;
    let shallowDashboard;
    const dashboard = () => {
        if (!shallowDashboard) {
            shallowDashboard = shallow(<Dashboard {...props}/>);
        }
        return shallowDashboard;
    }

    // This reset the props and shallowDashboard variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowDashboard to undefined here, when the next test runs, 
    // if it calls dashboard, a new Dashboard will be created with the current props.
    beforeEach(() => {
        props = {
            match: {
                params: {
                    id: 12345,
                }
            },
        }
        shallowDashboard = undefined;
    });

    // The default test environment for Jest is a browser-like environment provided by jsdom,
    // which implements most of what an actual browser would provide, but it doesn't implement projecterything.
    // Specifically, jsdom doesn't implement window.scrollTo, and instead throws an Error.
    const jsdomScrollTo = window.scrollTo;  // remember the jsdom scrollTo
    beforeAll(() => {
        window.scrollTo = jest.fn(); // provide a mock implementation for window.scrollTo
    });

    afterAll(() => {
        window.scrollTo = jsdomScrollTo; // restore the jsdom scrollTo
    });

    test('has 3 children', () => {
        expect(dashboard().children().length).toEqual(3);
    });

    test('has 1 Image components rendered with passed properties', () => {
        const shallowWrapper = dashboard().find(Image);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('imagePath');
    });

    test('has one h1 HTML element', () => {
        const shallowWrapper = dashboard().find('h1');
        expect(shallowWrapper.length).toEqual(1);
    });

    test('has one h4 HTML element', () => {
        const shallowWrapper = dashboard().find('h4');
        expect(shallowWrapper.length).toEqual(1);
    });

    test('has one Grid component rendered with passed properties', () => {
        const shallowWrapper = dashboard().find(Grid);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('content');
        expect(shallowWrapper.prop('content').length).toEqual(4);

    });

    test('has Grid with 4 Image components', () => {
        const shallowWrapper = dashboard().find(Grid).prop('content');
        expect(shallowWrapper.length).toEqual(4);
        shallowWrapper.forEach((node) => {
            expect(node[0].type).toEqual(Image);
        });
    });

    test('has Grid with 4 h2 HTML elements', () => {
        const shallowWrapper = dashboard().find(Grid).prop('content');
        expect(shallowWrapper.length).toEqual(4);
        shallowWrapper.forEach((node) => {
            expect(node[1].type).toEqual('h2');
        });
    });

    test('has Grid with 4 p HTML elements rendered with correct text', () => {
        const shallowWrapper = dashboard().find(Grid).prop('content');
        expect(shallowWrapper.length).toEqual(4);

        const text = ['invested', 'produced', 'CO2 saved', 'received'];
        shallowWrapper.forEach((node, i) => {
            expect(node[2].type).toEqual('p');
            expect(node[2].props.children).toBe(text[i]);
        });
    });

    test('has one CallToActionButton component rendered with passed properties', () => {
        const shallowWrapper = dashboard().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);

        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('callToActionText');
            expect(Object.keys(node.props())).toContain('onButtonClick');
        });
    });

   test('has one ProjectsContainer component rendered with passed properties', () => {
        const shallowWrapper = dashboard().find(ProjectsContainer);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('projects');
    });
});
