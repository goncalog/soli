import React from 'react';
import Option from '../../../components/support/Option';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Option', () => {
    let props;
    let shallowOption;
    const mockFunction = jest.fn();
    const option = () => {
        if (!shallowOption) {
            shallowOption = shallow(<Option {...props}/>);
        }
        return shallowOption;
    }

    // This resets the props and shallowOption variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOption to undefined here, when the next test runs, 
    // if it calls option, a new Option will be created with the current props.
    beforeEach(() => {
        props = {
            options: [{ name: "Test 1", _id: '21123231' }, { name: "Test 2", _id: '435254243' }],
            onChange: mockFunction,
        }
        shallowOption = undefined;
    });

    test('has 2 children', () => {
        expect(option().children().length).toEqual(2);
    });

    test('has 2 HTML input elements', () => {
        const shallowWrapper = option().find('input');
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node, index) => {
            expect(node.key()).toBe((props.options[index]._id));
            expect(node.prop('id')).toBe((index));
            expect(node.prop('value')).toBe(props.options[index]._id);
            expect(node.prop('type')).toBe('radio');
            node.simulate('change', { target: { id: 'test' } });
            expect(mockFunction).toHaveBeenCalled();
        });
    });

    test('has 2 HTML label elements', () => {
        const shallowWrapper = option().find('label');
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node, index) => {
            expect(node.prop('for')).toBe((props.options[index]._id));
            expect(node.text()).toBe(props.options[index].name);
        });
    });
});
