import React from 'react';
import ImageSlider from '../../../components/support/ImageSlider';
import Image from '../../../components/support/Image';
import ChangeImageButton from '../../../components/support/ChangeImageButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ImageSlider', () => {
    let props;
    let shallowImageSlider;
    const mockFunction = jest.fn();
    const imageSlider = () => {
        if (!shallowImageSlider) {
            shallowImageSlider = shallow(<ImageSlider {...props} />);
        }
        return shallowImageSlider;
    }

    // This reset the props and shallowImageSlider variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowImageSlider to undefined here, when the next test runs, 
    // if it calls imageSlider, a new ImageSlider will be created with the current props
    beforeEach(() => {        
        props = {
            imagePath: '/path/to/project/image',
            onChangeImageButtonClick: mockFunction,
        }
        shallowImageSlider = undefined;
    });

    test('has 3 children', () => {
        expect(imageSlider().children().length).toEqual(3);
    });

    test('has one Image component rendered with passed property', () => {
        const shallowWrapper = imageSlider().find(Image);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('imagePath')).toBe(props.imagePath);
    });

    test('has 2 ChangeImageButton component rendered with passed property', () => {
        const shallowWrapper = imageSlider().find(ChangeImageButton);
        expect(shallowWrapper.length).toEqual(2);
        const type = ['previous', 'next'];
        shallowWrapper.forEach((node, i) => {
            expect(node.prop('type')).toBe(type[i]);
        });
    });

    test('should call mockFunction onChangeImageButtonClick', () => {
        const shallowWrapper = imageSlider().find(ChangeImageButton);
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node) => {
            node.props().onChangeImageButtonClick();
            expect(mockFunction).toHaveBeenCalled();
        });
    });
});
