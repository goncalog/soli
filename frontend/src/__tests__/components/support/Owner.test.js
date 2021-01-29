import React from 'react';
import Owner from '../../../components/support/Owner';
import OwnerName from '../../../components/support/OwnerName';
import OwnerRating from '../../../components/support/OwnerRating';
import CallToActionButton from '../../../components/support/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Owner', () => {
    let props;
    let shallowOwner;
    const owner = () => {
        if (!shallowOwner) {
            shallowOwner = shallow(<Owner {...props}/>)
        }
        return shallowOwner;
    }

    // This reset the props and shallowOwner variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwner to undefined here, when the next test runs, 
    // if it calls owner, a new Owner will be created with the current props
    beforeEach(() => {
        props = {
            name: "Text to test name property",
            rating: "2.25212",
            callToActionText: "Text to test callToActionText property",
        };
        shallowOwner = undefined;
    });

    test('has 3 children', () => {
        expect(owner().children().length).toEqual(3);
    });
    
    test('has one OwnerName component rendered with a passed name property', () => {
        const shallowWrapper = owner().find(OwnerName);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe(props.name);
    });
    
    test('has one OwnerRating component rendered with a passed name property', () => {
        const shallowWrapper = owner().find(OwnerRating);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('rating')).toBe(props.rating);
    });
    
    test('has one CallToActionButton component rendered with a passed callToActionText property', () => {
        const shallowWrapper = owner().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe(props.callToActionText);
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });
});
