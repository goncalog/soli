import React from 'react';
import Title from '../../../components/support/Title';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Title', () => {
    let props;
    let shallowTitle;
    const title = () => {
        if (!shallowTitle) {
            shallowTitle = shallow(<Title {...props} />);
        }
        return shallowTitle;
    }

    // This reset the props and shallowTitle variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowTitle to undefined here, when the next test runs, 
    // if it calls title, a new Title will be created with the current props
    beforeEach(() => {
        props = {
            title: 'Text to test title property',
        }
        shallowTitle = undefined;
    });

    test('has one child', () => {
        expect(title().children().length).toEqual(1);
    });

    test('has one h5 HTML element with some text passed as a property', () => {
        const shallowWrapper = title().find('h5.title');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.title);
    });
});
