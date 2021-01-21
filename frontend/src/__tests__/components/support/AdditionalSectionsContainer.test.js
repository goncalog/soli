import React from 'react';
import AdditionalSectionsContainer from '../../../components/support/AdditionalSectionsContainer';
import AdditionalSection from '../../../components/support/AdditionalSection';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('AdditionalSectionsContainer', () => {
    let props;
    let shallowAdditionalSectionsContainer;
    const mockFunction = jest.fn();
    const additionalSectionsContainer = () => {
        if (!shallowAdditionalSectionsContainer) {
            shallowAdditionalSectionsContainer = shallow(<AdditionalSectionsContainer {...props} />);
        }
        return shallowAdditionalSectionsContainer;
    }

    // This reset the props and shallowAdditionalSectionsContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowAdditionalSectionsContainer to undefined here, when the next test runs, 
    // if it calls additionalSectionsContainer, a new AdditionalSectionsContainer will be created with the current props
    beforeEach(() => {
        props = {
            sectionsVisibility: [false, true, false, true],
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
            onChangeSectionsVisibility: mockFunction,
        }
        shallowAdditionalSectionsContainer = undefined;
    });

    test('has 4 children', () => {
        expect(additionalSectionsContainer().children().length).toEqual(4);
    });

    test('has 4 AdditionalSection components rendered with passed properties', () => {
        const shallowWrapper = additionalSectionsContainer().find(AdditionalSection);
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((section, i) => {
            expect(section.prop('name')).toBe(props.sections[i].name);
            expect(section.prop('expandButtonText')).toBe(props.sections[i].expandButtonText);
            expect(section.prop('features')).toBe(props.sections[i].features);
            expect(section.key()).toBe(i.toString());
            expect(section.prop('section')).toBe(i);
            expect(section.prop('sectionVisibility')).toBe(props.sectionsVisibility[i]);
            section.props().onChangeSectionVisibility();
            expect(mockFunction).toHaveBeenCalled();
        });
    });
});
