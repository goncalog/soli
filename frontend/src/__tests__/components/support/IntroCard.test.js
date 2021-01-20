import React from 'react';
import IntroCard from '../../../components/support/IntroCard';
import Image from '../../../components/support/Image';
import Title from '../../../components/support/Title';
import Price from '../../../components/support/Price';
import KeyFeatures from '../../../components/support/KeyFeatures';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('IntroCard', () => {
    let props;
    let shallowIntroCard;
    const introCard = () => {
        if (!shallowIntroCard) {
            shallowIntroCard = shallow(<IntroCard {...props} />);
        }
        return shallowIntroCard;
    }

    // This reset the props and shallowIntroCard variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowIntroCard to undefined here, when the next test runs, 
    // if it calls introCard, a new IntroCard will be created with the current props
    beforeEach(() => {
        props = {
            imagePath: '/path/to/project/image',
            title: 'Text to test title property',
            price: '11900',
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
        shallowIntroCard = undefined;
    });

    test('has 4 children', () => {
        expect(introCard().children().length).toEqual(4);
    });

    test('has one Image component rendered with passed property', () => {
        const shallowWrapper = introCard().find(Image);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('imagePath')).toBe(props.imagePath);
    });

    test('has one Title component rendered with passed property', () => {
        const shallowWrapper = introCard().find(Title);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('title')).toBe(props.title);
    });

    test('has one Price component rendered with passed property', () => {
        const shallowWrapper = introCard().find(Price);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('price')).toBe(props.price);
    });

    test('has one KeyFeatures components rendered with passed properties', () => {
        const shallowWrapper = introCard().find(KeyFeatures);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('features')).toBe(props.features);
    });
});
