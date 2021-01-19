import React from 'react';
import Home from '../../../components/main/Home';
import HeadlineContainer from '../../../components/support/HeadlineContainer';
import MainHeadline from '../../../components/support/MainHeadline';
import Grid from '../../../components/support/Grid';
import CallToActionButton from '../../../components/support/CallToActionButton';
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

    test('has 4 children', () => {
        expect(home().children().length).toEqual(4);
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
        expect(shallowWrapper.prop('callToActionText')).toBe('Let\'s EARN!');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one MainHeadline', () => {
        expect(home().find(MainHeadline).length).toEqual(1);
    });

    test('renders MainHeadline with passed properties', () => {
        const shallowWrapper = home().find(MainHeadline);
        expect(Object.keys(shallowWrapper.props())).toContain('mainHeadline');
    });

    test('has one Grid', () => {
        expect(home().find(Grid).length).toEqual(1);
    });

    test('renders Grid with passed properties', () => {
        const shallowWrapper = home().find(Grid);
        expect(shallowWrapper.prop('content').length).toEqual(2);
    });

    test('has one CallToActionButton', () => {
        expect(home().find(CallToActionButton).length).toEqual(1);
    });
    
    test('renders CallToActionButton with passed properties', () => {
        const shallowWrapper = home().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe('Let\'s EARN!');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one BenefitsContainer', () => {
        expect(home().find(BenefitsContainer).length).toEqual(1);
    });

    test('renders BenefitsContainer with passed properties', () => {
        const shallowWrapper = home().find(BenefitsContainer);
        expect(shallowWrapper.prop('benefits').length).toEqual(3);
        expect(shallowWrapper.prop('callToActionText')).toBe('Let\'s EARN!');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one OwnerContainer', () => {
        expect(home().find(OwnerContainer).length).toEqual(1);
    });
    
    test('renders OwnerContainer with passed properties', () => {
        const shallowWrapper = home().find(OwnerContainer);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('backgroundImagePath')).toBe('owner-container-background.jpg');
        expect(shallowWrapper.prop('mainHeadline')).toBe('Monetise your roof');
        expect(shallowWrapper.prop('secondaryHeadline'))
                .toBe('Find solar panel owners interested in using your roof to produce energy');
        expect(shallowWrapper.prop('callToActionText')).toBe('Let\'s EARN!');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });
});
