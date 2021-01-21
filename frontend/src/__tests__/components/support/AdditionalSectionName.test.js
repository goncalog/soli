import React from 'react';
import AdditionalSectionName from '../../../components/support/AdditionalSectionName';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('AdditionalSectionName', () => {
    let props;
    let shallowAdditionalSectionName;
    const additionalSectionName = () => {
        if (!shallowAdditionalSectionName) {
            shallowAdditionalSectionName = shallow(<AdditionalSectionName {...props} />);
        }
        return shallowAdditionalSectionName;
    }

    // This reset the props and shallowAdditionalSectionName variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowAdditionalSectionName to undefined here, when the next test runs, 
    // if it calls additionalSectionName, a new AdditionalSectionName will be created with the current props
    beforeEach(() => {
        props = {
            name: 'Text to test name property',
        }
        shallowAdditionalSectionName = undefined;
    });

    test('has one child', () => {
        expect(additionalSectionName().children().length).toEqual(1);
    });

    test('has one h5 HTML element with some text passed as a property', () => {
        const shallowWrapper = additionalSectionName().find('h5.section-name');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.name);
    });
});
