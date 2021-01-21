import React from 'react';
import AdditionalSection from '../../../components/support/AdditionalSection';
import AdditionalSectionName from '../../../components/support/AdditionalSectionName';
import ExpandButton from '../../../components/support/ExpandButton';
import AdditionalFeatures from '../../../components/support/AdditionalFeatures';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('AdditionalSection', () => {
    let props;
    let shallowAdditionalSection;
    const mockFunction = jest.fn();
    const additionalSection = () => {
        if (!shallowAdditionalSection) {
            shallowAdditionalSection = shallow(<AdditionalSection {...props} />);
        }
        return shallowAdditionalSection;
    }

    // This reset the props and shallowAdditionalSection variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowAdditionalSection to undefined here, when the next test runs, 
    // if it calls additionalSection, a new AdditionalSection will be created with the current props
    beforeEach(() => {
        props = {
            name: 'Text to test name property',
            section: 'Text to test section property',
            expandButtonText: 'Text to test expandButtonText property',
            onChangeSectionVisibility: mockFunction,
            features: [
                { 
                    name: 'Text to test name property #1',
                    value: 'Text to test value property #1',
                },
                { 
                    name: 'Text to test name property #2',
                    value: 'Text to test value property #2',
                },
            ],
            sectionVisibility: 'Text to test sectionVisibility property',
        }
        shallowAdditionalSection = undefined;
    });

    test('has 3 children', () => {
        expect(additionalSection().children().length).toEqual(3);
    });

    test('has one AdditionalSectionName component rendered with passed property', () => {
        const shallowWrapper = additionalSection().find(AdditionalSectionName);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe(props.name);
    });

    test('has one ExpandButton component rendered with passed properties', () => {
        const shallowWrapper = additionalSection().find(ExpandButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('section')).toBe(props.section);
        expect(shallowWrapper.prop('expandButtonText')).toBe(props.expandButtonText);
    });

    test('should call mockFunction onChangeSectionVisibility', () => {
        const shallowWrapper = additionalSection().find(ExpandButton);
        shallowWrapper.props().onChangeSectionVisibility();
        expect(mockFunction).toHaveBeenCalled();
    });

    test('has one AdditionalFeatures components rendered with passed properties', () => {
        const shallowWrapper = additionalSection().find(AdditionalFeatures);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('features')).toBe(props.features);
        expect(shallowWrapper.prop('sectionVisibility')).toBe(props.sectionVisibility);
    });
});
