import React from 'react';
import Size from '../../../components/support/Size';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Size', () => {
    let props;
    let shallowSize;
    const size = () => {
        if (!shallowSize) {
            shallowSize = shallow(<Size {...props} />);
        }
        return shallowSize;
    }

    // This reset the props and shallowSize variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSize to undefined here, when the next test runs, 
    // if it calls size, a new Size will be created with the current props
    beforeEach(() => {
        props = {
            size: '4900 kW | £35k',
        }
        shallowSize = undefined;
    });

    test('has one child', () => {
        expect(size().children().length).toEqual(1);
    });

    test('has one p HTML element with some text passed as a property', () => {
        const shallowWrapper = size().find('p.size');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.size);
    });
});
