import React from 'react';
import Feature from '../../../components/support/Feature';
import FeatureName from '../../../components/support/FeatureName';
import FeatureValue from '../../../components/support/FeatureValue';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Feature', () => {
    let props;
    let shallowFeature;
    const feature = () => {
        if (!shallowFeature) {
            shallowFeature = shallow(<Feature {...props}/>)
        }
        return shallowFeature;
    }

    // This reset the props and shallowFeature variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowFeature to undefined here, when the next test runs, 
    // if it calls feature, a new Feature will be created with the current props
    beforeEach(() => {
        props = {
            name: "Text to test name property",
            value: "Text to test value property",
        };
        shallowFeature = undefined;
    });

    test('has 2 children', () => {
        expect(feature().children().length).toEqual(2);
    });
    
    test('has one FeatureName component rendered with some text passed as a property', () => {
        const shallowWrapper = feature().find(FeatureName);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe(props.name);
    });

    test('has one FeatureValue component rendered with some text passed as a property', () => {
        const shallowWrapper = feature().find(FeatureValue);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('value')).toBe(props.value);
    });
});
