import React from 'react';
import KeyFeatures from '../../../components/support/KeyFeatures';
import Feature from '../../../components/support/Feature';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('KeyFeatures', () => {
    let props;
    let shallowKeyFeatures;
    const keyFeatures = () => {
        if (!shallowKeyFeatures) {
            shallowKeyFeatures = shallow(<KeyFeatures {...props} />);
        }
        return shallowKeyFeatures;
    }

    // This reset the props and shallowKeyFeatures variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowKeyFeatures to undefined here, when the next test runs, 
    // if it calls keyFeatures, a new KeyFeatures will be created with the current props
    beforeEach(() => {
        props = {
            features: [
                { 
                    name: 'Text to test name property #1',
                    value: 'Text to test value property #1',
                },
                { 
                    name: 'Text to test name property #2',
                    value: 'Text to test value property #2',
                },
                { 
                    name: 'Text to test name property #3',
                    value: 'Text to test value property #3',
                },
            ],
        }
        shallowKeyFeatures = undefined;
    });

    test('has 3 children', () => {
        expect(keyFeatures().children().length).toEqual(3);
    });

    test('has 3 Feature components rendered with passed properties', () => {
        const shallowWrapper = keyFeatures().find(Feature);
        expect(shallowWrapper.length).toEqual(3);

        shallowWrapper.forEach((feature, i) => {
            expect(feature.prop('name')).toBe(props.features[i].name);
            expect(feature.prop('value')).toBe(props.features[i].value);
        });
    });
});
