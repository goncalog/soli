import React from 'react';
import OwnerProject from '../../../components/main/OwnerProject';
import CallToActionButton from '../../../components/support/CallToActionButton';
import Project from '../../../components/main/Project';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OwnerProject', () => {
    let shallowOwnerProject;
    let props;
    const ownerProject = () => {
        if (!shallowOwnerProject) {
            shallowOwnerProject = shallow(<OwnerProject {...props}/>);
        }
        return shallowOwnerProject;
    }

    // This resets the props and the shallowOwnerProject variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwnerProject to undefined here, when the next test runs, 
    // if it calls ownerProject, a new OwnerProject will be created.
    beforeEach(() => {
        props = {
            match: {
                url: 'current/url',
            }
        }
        shallowOwnerProject = undefined;
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
        expect(ownerProject().children().length).toEqual(2);
    });

    test('has 2 CallToActionButton rendered with passed properties', () => {
        const shallowWrapper = ownerProject().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('callToActionText');
            expect(Object.keys(node.props())).toContain('onButtonClick');
        });
        
    });

    test('has one Project component rendered with passed property', () => {
        const shallowWrapper = ownerProject().find(Project);
        expect(shallowWrapper.length).toEqual(1);
    });    
});
