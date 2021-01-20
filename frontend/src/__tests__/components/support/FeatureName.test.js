import React from 'react';
import FeatureName from '../../../components/support/FeatureName';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('FeatureName', () => {
    let props;
    let shallowFeatureName;
    const featureName = () => {
        if (!shallowFeatureName) {
            shallowFeatureName = shallow(<FeatureName {...props} />);
        }
        return shallowFeatureName;
    }

    // This reset the props and shallowFeatureName variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowFeatureName to undefined here, when the next test runs, 
    // if it calls featureName, a new FeatureName will be created with the current props
    beforeEach(() => {
        props = {
            name: 'Text to test name property',
        }
        shallowFeatureName = undefined;
    });

    test('has one child', () => {
        expect(featureName().children().length).toEqual(1);
    });

    test('has one p HTML element with some text passed as a property', () => {
        const shallowWrapper = featureName().find('p.feature-name');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.name);
    });
});
