import React from 'react';
import Price from '../../../components/support/Price';
import formatPrice from '../../../utils/formatPrice';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Price', () => {
    let props;
    let shallowPrice;
    const price = () => {
        if (!shallowPrice) {
            shallowPrice = shallow(<Price {...props} />);
        }
        return shallowPrice;
    }

    // This reset the props and shallowPrice variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowPrice to undefined here, when the next test runs, 
    // if it calls price, a new Price will be created with the current props
    beforeEach(() => {
        props = {
            price: '4900',
        }
        shallowPrice = undefined;
    });

    test('has one child', () => {
        expect(price().children().length).toEqual(1);
    });

    test('has one p HTML element with some text passed as a property', () => {
        const shallowWrapper = price().find('p.price');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(formatPrice('uk', props.price));
    });
});
