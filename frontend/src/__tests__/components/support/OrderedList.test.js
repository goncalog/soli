import React from 'react';
import OrderedList from '../../../components/support/OrderedList';
import Image from '../../../components/support/Image';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OrderedList without icons', () => {
    let props;
    let shallowOrderedList;
    const orderedList = () => {
        if (!shallowOrderedList) {
            shallowOrderedList = shallow(<OrderedList {...props} />);
        }
        return shallowOrderedList;
    }

    // This reset the props and shallowOrderedList variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOrderedList to undefined here, when the next test runs, 
    // if it calls orderedList, a new OrderedList will be created with the current props
    beforeEach(() => {
        props = {
            listItems:
                [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                    'Test 4',
                ],
        }
        shallowOrderedList = undefined;
    });

    test('has one child', () => {
        expect(orderedList().children().length).toEqual(1);
    });

    test('has one ol HTML element', () => {
        const shallowWrapper = orderedList().find('ol');
        expect(shallowWrapper.length).toEqual(1);
    });

    test('has 4 li HTML elements', () => {
        const shallowWrapper = orderedList().find('li');
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((item, i) => {
            expect(item.text()).toBe(`Test ${i+1}`);
        });
    });
});

describe('OrderedList with icons', () => {
    let props;
    let shallowOrderedList;
    const orderedList = () => {
        if (!shallowOrderedList) {
            shallowOrderedList = shallow(<OrderedList {...props} />);
        }
        return shallowOrderedList;
    }

    // This reset the props and shallowOrderedList variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOrderedList to undefined here, when the next test runs, 
    // if it calls orderedList, a new OrderedList will be created with the current props
    beforeEach(() => {
        props = {
            listItems:
                [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                    'Test 4',
                ],
                icons: [
                    'Test path to icon 1',
                    'Test path to icon 2',
                    'Test path to icon 3',
                    'Test path to icon 4',
                ],
        }
        shallowOrderedList = undefined;
    });

    test('has one child', () => {
        expect(orderedList().children().length).toEqual(1);
    });

    test('has one ol HTML element', () => {
        const shallowWrapper = orderedList().find('ol');
        expect(shallowWrapper.length).toEqual(1);
    });

    test('has 4 Image components', () => {
        const shallowWrapper = orderedList().find(Image);
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((item, i) => {
            expect(item.prop('imagePath')).toBe(props.icons[i]);
        });
    });

    test('has 4 p HTML elements', () => {
        const shallowWrapper = orderedList().find('p');
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((item, i) => {
            expect(item.text()).toBe(props.listItems[i]);
        });
    });
});
