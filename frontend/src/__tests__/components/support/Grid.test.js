import React from 'react';
import Grid from '../../../components/support/Grid';
import MainHeadline from '../../../components/support/MainHeadline';
import SecondaryHeadline from '../../../components/support/SecondaryHeadline';
import OrderedList from '../../../components/support/OrderedList';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Grid', () => {
    let props;
    let shallowGrid;
    const grid = () => {
        if (!shallowGrid) {
            shallowGrid = shallow(<Grid {...props} />);
        }
        return shallowGrid;
    }

    // This reset the props and shallowGrid variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowGrid to undefined here, when the next test runs, 
    // if it calls grid, a new Grid will be created with the current props
    beforeEach(() => {
        props = {
            content: [
                [
                    <MainHeadline mainHeadline="Test 1" />,
                    <OrderedList listItems={
                        [
                            'Test 1',
                            'Test 1',
                        ]}  
                    />,
                    <SecondaryHeadline secondaryHeadline="Test 1" />,
                ],        
                [
                    <MainHeadline mainHeadline="Test 2" />,
                    <OrderedList listItems={
                        [
                            'Test 2',
                            'Test 2',
                        ]}  
                    />,
                    <SecondaryHeadline secondaryHeadline="Test 2" />,
                ],
                [
                    <MainHeadline mainHeadline="Test 3" />,
                    <OrderedList listItems={
                        [
                            'Test 3',
                            'Test 3',
                        ]}  
                    />,
                    <SecondaryHeadline secondaryHeadline="Test 3" />,
                ],
            ],
        }
        shallowGrid = undefined;
    });

    test('has 3 children', () => {
        expect(grid().children().length).toEqual(3);
    });

    test('has 3 MainHeadline components rendered with passed properties', () => {
        const shallowWrapper = grid().find(MainHeadline);
        expect(shallowWrapper.length).toEqual(3);

        shallowWrapper.forEach((item, i) => {
            expect(item.prop('mainHeadline')).toBe(`Test ${i+1}`);
        });
    });

    test('has 3 OrderedList components rendered with passed properties', () => {
        const shallowWrapper = grid().find(OrderedList);
        expect(shallowWrapper.length).toEqual(3);

        shallowWrapper.forEach((item, i) => {
            expect(Object.keys(item.props())).toContain('listItems');
        });
    });

    test('has 3 SecondaryHeadline components rendered with passed properties', () => {
        const shallowWrapper = grid().find(SecondaryHeadline);
        expect(shallowWrapper.length).toEqual(3);

        shallowWrapper.forEach((item, i) => {
            expect(item.prop('secondaryHeadline')).toBe(`Test ${i+1}`);
        });
    });
});
