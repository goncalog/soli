import React from 'react';
import Invest from '../../../components/main/Invest';
import Title from '../../../components/support/Title';
import Size from '../../../components/support/Size';
import KeyFeatures from '../../../components/support/KeyFeatures';
import MainHeadline from '../../../components/support/MainHeadline';
import SecondaryHeadline from '../../../components/support/SecondaryHeadline';
import Input from '../../../components/support/Input';
import CallToActionButton from '../../../components/support/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Invest', () => {
    let props;
    let shallowInvest;
    const invest = () => {
        if (!shallowInvest) {
            shallowInvest = shallow(<Invest {...props}/>);
        }
        return shallowInvest;
    }

    // This reset the props and shallowInvest variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowInvest to undefined here, when the next test runs, 
    // if it calls invest, a new Invest will be created with the current props.
    beforeEach(() => {
        props = {
            match: {
                params: {
                    id: 12345,
                }
            },
        }
        shallowInvest = undefined;
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

    test('has 4 children', () => {
        expect(invest().children().length).toEqual(4);
    });

    test('has one Title component rendered with passed properties', () => {
        const shallowWrapper = invest().find(Title);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('title');
    });

    test('has one Size component rendered with passed properties', () => {
        const shallowWrapper = invest().find(Size);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('size');
    });

    test('has one KeyFeatures components rendered with passed properties', () => {
        const shallowWrapper = invest().find(KeyFeatures);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('features');
    });

    test('has one MainHeadline component rendered with passed properties', () => {
        const shallowWrapper = invest().find(MainHeadline);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('mainHeadline');
    });

    test('has one SecondaryHeadline component rendered with passed properties', () => {
        const shallowWrapper = invest().find(SecondaryHeadline);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('secondaryHeadline');
    });

   test('has one Input component rendered with passed properties', () => {
        const shallowWrapper = invest().find(Input);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('className');
        expect(Object.keys(shallowWrapper.props())).toContain('property');
        expect(Object.keys(shallowWrapper.props())).toContain('placeholder');
        expect(Object.keys(shallowWrapper.props())).toContain('text');
        expect(Object.keys(shallowWrapper.props())).toContain('onTextChange');
    });

    test('has 2 CallToActionButton components rendered with passed properties', () => {
        const shallowWrapper = invest().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(2);

        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('callToActionText');
            expect(Object.keys(node.props())).toContain('onButtonClick');
        });
    });
});
