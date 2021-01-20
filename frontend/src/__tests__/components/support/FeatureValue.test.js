import React from 'react';
import FeatureValue from '../../../components/support/FeatureValue';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('FeatureValue', () => {
    let props;
    let shallowFeatureValue;
    const featureValue = () => {
        if (!shallowFeatureValue) {
            shallowFeatureValue = shallow(<FeatureValue {...props} />);
        }
        return shallowFeatureValue;
    }

    // This reset the props and shallowFeatureValue variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowFeatureValue to undefined here, when the next test runs, 
    // if it calls featureValue, a new FeatureValue will be created with the current props
    beforeEach(() => {
        props = {
            value: 'Text to test value property',
        }
        shallowFeatureValue = undefined;
    });

    test('has one child', () => {
        expect(featureValue().children().length).toEqual(1);
    });

    test('has one p HTML element with some text passed as a property', () => {
        const shallowWrapper = featureValue().find('p.feature-value.small');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.value);
    });
});
