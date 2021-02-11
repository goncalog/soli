import React from 'react';
import Form from '../../../components/main/Form';
import MainHeadline from '../../../components/support/MainHeadline';
import CallToActionButton from '../../../components/support/CallToActionButton';
import Input from '../../../components/support/Input';
import Select from '../../../components/support/Select';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Form', () => {
    let props;
    let shallowForm;
    const form = () => {
        if (!shallowForm) {
            shallowForm = shallow(<Form {...props} />);
        }
        return shallowForm;
    }

    // This resets the props and shallowForm variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowForm to undefined here, when the next test runs, 
    // if it calls form, a new Form will be created.
    beforeEach(() => {
        props = {
            match: { 
                url: '/test/url',
            }
        };
        shallowForm = undefined;
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

    test('has 21 children', () => {
        expect(form().children().length).toEqual(21);
    });

    test('has one MainHeadline rendered with passed properties', () => {
        const shallowWrapper = form().find(MainHeadline);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('mainHeadline');
    });

    test('has 7 CallToActionButton components rendered with passed properties', () => {
        const shallowWrapper = form().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(7);
        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('callToActionText');
            expect(Object.keys(node.props())).toContain('onButtonClick');
        });
        
    });

    test('has 13 Input components rendered with passed properties', () => {
        const shallowWrapper = form().find(Input);
        expect(shallowWrapper.length).toEqual(13);
        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('className');
            expect(Object.keys(node.props())).toContain('property');
            expect(Object.keys(node.props())).toContain('placeholder');
            expect(Object.keys(node.props())).toContain('text');
            expect(Object.keys(node.props())).toContain('onTextChange');
        })
    });

    test('has 5 Select components rendered with passed properties', () => {
        const shallowWrapper = form().find(Select);
        expect(shallowWrapper.length).toEqual(5);
        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('className');
            expect(Object.keys(node.props())).toContain('property');
            expect(Object.keys(node.props())).toContain('placeholder');
            expect(Object.keys(node.props())).toContain('onTextChange');
            expect(Object.keys(node.props())).toContain('options');
            expect(Object.keys(node.props())).toContain('option');
        });
    });

    test('has 5 HTML p elements', () => {
        const shallowWrapper = form().find('p');
        expect(shallowWrapper.length).toEqual(5);
    });
});
