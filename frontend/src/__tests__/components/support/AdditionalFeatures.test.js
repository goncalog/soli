import React from 'react';
import AdditionalFeatures from '../../../components/support/AdditionalFeatures';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('AdditionalFeatures', () => {
    let props;
    let shallowAdditionalFeatures;
    const additionalFeatures = () => {
        if (!shallowAdditionalFeatures) {
            shallowAdditionalFeatures = shallow(<AdditionalFeatures {...props} />);
        }
        return shallowAdditionalFeatures;
    }

    // This reset the props and shallowAdditionalFeatures variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowAdditionalFeatures to undefined here, when the next test runs, 
    // if it calls additionalFeatures, a new AdditionalFeatures will be created with the current props
    beforeEach(() => {
        props = {
            features: [
                { 
                    name: 'Text to test name property #1',
                },
                { 
                    name: 'Text to test name property #2',
                    value: 'Text to test value property #2',
                },
                { 
                    name: 'Text to test name property #3',
                    value: 'Text to test value property #3',
                },
                { 
                    name: 'Text to test name property #4',
                    value: 'Text to test value property #4',
                },
            ],
            sectionVisibility: false,
        }
        shallowAdditionalFeatures = undefined;
    });

    test('has 4 children', () => {
        expect(additionalFeatures().children().length).toEqual(4);
    });

    test('has 4 p HTML elements rendered with passed properties', () => {
        const shallowWrapper = additionalFeatures().find('p.additional-feature');
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((feature, i) => {
            if (i === 0) {
                expect(feature.text()).toBe(`- ${props.features[i].name}`);
            } else {
                expect(feature.text()).toBe(`- ${props.features[i].name}: ${props.features[i].value}`);                
            }
            expect(feature.key()).toBe(i.toString());
        });
    });

    test('has class based on passed property', () => {
        expect(additionalFeatures().hasClass(`additional-features${props.sectionVisibility ? "" : " hidden"}`))
            .toBe(true);
    });
});
