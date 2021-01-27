import React from 'react';
import Project from '../../../components/main/Project';
import Title from '../../../components/support/Title';
import Size from '../../../components/support/Size';
import OwnerContact from '../../../components/support/OwnerContact';
import Detail from '../../../components/support/Detail';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Project', () => {
    let props;
    let shallowProject;
    const project = () => {
        if (!shallowProject) {
            shallowProject = shallow(<Project {...props}/>);
        }
        return shallowProject;
    }

    // This reset the props and shallowProject variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowProject to undefined here, when the next test runs, 
    // if it calls project, a new Project will be created with the current props.
    beforeEach(() => {
        props = {
            match: {
                params: {
                    id: 12345,
                }
            },
        }
        shallowProject = undefined;
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

    test('has 5 children', () => {
        expect(project().children().length).toEqual(5);
    });

    test('has one Title component rendered with passed properties', () => {
        const shallowWrapper = project().find(Title);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('title');
    });

    test('has one Size component rendered with passed properties', () => {
        const shallowWrapper = project().find(Size);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('size');
    });

    test('has 2 OwnerContact components rendered with passed properties', () => {
        const shallowWrapper = project().find(OwnerContact);
        expect(shallowWrapper.length).toEqual(2);

        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('name');
            expect(Object.keys(node.props())).toContain('rating');
            expect(Object.keys(node.props())).toContain('callToActionText');
            expect(Object.keys(node.props())).toContain('contact');
            expect(Object.keys(node.props())).toContain('id');
        });
    });

    test('has one Detail component rendered with passed properties', () => {
        const shallowWrapper = project().find(Detail);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('imagePath');
        expect(shallowWrapper.prop('features')).toBeTruthy();
        expect(shallowWrapper.prop('sectionsVisibility')).toBeTruthy();
        expect(shallowWrapper.prop('sections')).toBeTruthy();
        expect(Object.keys(shallowWrapper.props())).toContain('onChangeImageButtonClick');
        expect(Object.keys(shallowWrapper.props())).toContain('onChangeSectionsVisibility');
    });
});
