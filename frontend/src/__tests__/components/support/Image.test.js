import React from 'react';
import Image from '../../../components/support/Image';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Image', () => {
    let props;
    let shallowImage;
    const image = () => {
        if (!shallowImage) {
            shallowImage = shallow(<Image {...props} />);
        }
        return shallowImage;
    }

    // This reset the props and shallowImage variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowImage to undefined here, when the next test runs, 
    // if it calls image, a new Image will be created with the current props
    beforeEach(() => {
        props = {
            imagePath: '/path/to/project/image',
        }
        shallowImage = undefined;
    });

    test('has one child', () => {
        expect(image().children().length).toEqual(1);
    });

    test('has one img HTML element with a source passed as a property', () => {
        const shallowWrapper = image().find('img.image');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('src')).toBe(props.imagePath);
    });
});
