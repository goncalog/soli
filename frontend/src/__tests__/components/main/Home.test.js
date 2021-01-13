import React from 'react';
import Home from '../../../components/main/Home';
import HeadlineContainer from '../../../components/support/HeadlineContainer';
import BenefitsContainer from '../../../components/support/BenefitsContainer';
import OwnerContainer from '../../../components/support/OwnerContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Home', () => {
    let shallowHome;
    const home = () => {
        if (!shallowHome) {
            shallowHome = shallow(<Home />);
        }
        return shallowHome;
    }

    // This reset the shallowHome variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowHome to undefined here, when the next test runs, 
    // if it calls home, a new Home will be created
    beforeEach(() => {
        shallowHome = undefined;
    });

    test('has three children', () => {
        expect(home().children().length).toEqual(3);
    });

    test('has one HeadlineContainer', () => {
        expect(home().find(HeadlineContainer).length).toEqual(1);
    });

    test('renders HeadlineContainer with passed properties', () => {
        const shallowWrapper = home().find(HeadlineContainer);
        expect(shallowWrapper.prop('backgroundImagePath')).toBe('headline-background.jpg');
        expect(shallowWrapper.prop('mainHeadline')).toBe('Make money from solar panels');
        expect(shallowWrapper.prop('secondaryHeadline'))
                .toBe('Whether you own a roof or not');
        expect(shallowWrapper.prop('callToActionText')).toBe('Let\'s JOIN!');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one BenefitsContainer', () => {
        expect(home().find(BenefitsContainer).length).toEqual(1);
    });

    test('renders BenefitsContainer with passed properties', () => {
        const shallowWrapper = home().find(BenefitsContainer);
        expect(shallowWrapper.prop('benefits').length).toEqual(3);
        expect(shallowWrapper.prop('callToActionText')).toBe('Let\'s JOIN!');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one OwnerContainer', () => {
        expect(home().find(OwnerContainer).length).toEqual(1);
    });
    
    test('renders OwnerContainer with passed properties', () => {
        const shallowWrapper = home().find(OwnerContainer);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('backgroundImagePath')).toBe('owner-container-background.jpg');
        expect(shallowWrapper.prop('mainHeadline')).toBe('Rent your roof');
        expect(shallowWrapper.prop('secondaryHeadline'))
                .toBe('Find solar panel owners interested in renting your roof to produce energy');
        expect(shallowWrapper.prop('callToActionText')).toBe('Let\'s JOIN!');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });
});
