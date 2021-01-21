import React from 'react';
import Detail from '../../../components/support/Detail';
import ImageSlider from '../../../components/support/ImageSlider';
import KeyFeatures from '../../../components/support/KeyFeatures';
import AdditionalSectionsContainer from '../../../components/support/AdditionalSectionsContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Detail', () => {
    let props;
    let shallowDetail;
    const mockFunction = jest.fn();
    const mockFunctionTwo = jest.fn();
    const detail = () => {
        if (!shallowDetail) {
            shallowDetail = shallow(<Detail {...props} />);
        }
        return shallowDetail;
    }

    // This reset the props and shallowDetail variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowDetail to undefined here, when the next test runs, 
    // if it calls detail, a new Detail will be created with the current props
    beforeEach(() => {
        props = {
            imagePath: '/path/to/project/image',
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
            sectionsVisibiliy: [false, true, false, true],
            sections: [
                {
                    name: 'Text to test name property #1',
                    expandButtonText: 'Text to test expandButtonText property #1',
                    features: [
                        { 
                            name: 'Text to test name property #1.1',
                            value: 'Text to test value property #1.1',
                        },
                        { 
                            name: 'Text to test name property #1.2',
                            value: 'Text to test value property #1.2',
                        },
                    ],    
                },
                {
                    name: 'Text to test name property #2',
                    expandButtonText: 'Text to test expandButtonText property #2',
                    features: [
                        { 
                            name: 'Text to test name property #2.1',
                            value: 'Text to test value property #2.1',
                        },
                        { 
                            name: 'Text to test name property #2.2',
                            value: 'Text to test value property #2.2',
                        },
                    ],    
                },
                {
                    name: 'Text to test name property #3',
                    expandButtonText: 'Text to test expandButtonText property #3',
                    features: [
                        { 
                            name: 'Text to test name property #3.1',
                            value: 'Text to test value property #3.1',
                        },
                        { 
                            name: 'Text to test name property #3.2',
                            value: 'Text to test value property #3.2',
                        },
                    ],    
                },
                {
                    name: 'Text to test name property #4',
                    expandButtonText: 'Text to test expandButtonText property #4',
                    features: [
                        { 
                            name: 'Text to test name property #4.1',
                            value: 'Text to test value property #4.1',
                        },
                        { 
                            name: 'Text to test name property #4.2',
                            value: 'Text to test value property #4.2',
                        },
                    ],    
                },
            ],
            onChangeImageButtonClick: mockFunction,
            onChangeSectionsVisibility: mockFunctionTwo,
        }
        shallowDetail = undefined;
    });

    test('has 3 children', () => {
        expect(detail().children().length).toEqual(3);
    });

    test('has one ImageSlider with passed property', () => {
        const shallowWrapper = detail().find(ImageSlider);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('imagePath')).toBe(props.imagePath);
    });

    test('has one KeyFeatures with passed property', () => {
        const shallowWrapper = detail().find(KeyFeatures);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('features')).toBe(props.features);
    });

    test('has one AdditionalSectionsContainer with passed properties', () => {
        const shallowWrapper = detail().find(AdditionalSectionsContainer);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('sectionsVisibility')).toBe(props.sectionsVisibility);
        expect(shallowWrapper.prop('sections')).toBe(props.sections);
    });

    test('should have called mockFunction onChangeImageButtonClick', () => {
        const shallowWrapper = detail().find(ImageSlider);
        shallowWrapper.props().onChangeImageButtonClick();
        shallowWrapper.props().onChangeImageButtonClick();
        expect(mockFunction).toHaveBeenCalledTimes(2);
    });

    test('should have called mockFunction onChangeSectionsVisibility', () => {
        const shallowWrapper = detail().find(AdditionalSectionsContainer);
        shallowWrapper.props().onChangeSectionsVisibility();
        shallowWrapper.props().onChangeSectionsVisibility();
        shallowWrapper.props().onChangeSectionsVisibility();
        expect(mockFunctionTwo).toHaveBeenCalledTimes(3);
    });
});
