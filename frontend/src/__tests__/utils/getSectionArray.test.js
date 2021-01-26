import getSectionArray from '../../utils/getSectionArray';

describe('getSectionArray', () => {
    it('returns the right array', () => {
        expect(getSectionArray([2000, 10000, 100, 1], 2015, 'kWh'))
                .toEqual([{ name: 2015, value: '2,000 kWh' },
                          { name: 2016, value: '10,000 kWh' },
                          { name: 2017, value: '100 kWh' },
                          { name: 2018, value: '1 kWh' } ]);

        expect(getSectionArray([2000, 10000, 100, 1], 2009, '£'))
                .toEqual([{ name: 2009, value: '£2,000' },
                          { name: 2010, value: '£10,000' },
                          { name: 2011, value: '£100' },
                          { name: 2012, value: '£1' } ]);

        expect(getSectionArray([5, 6.2, 10.1, 13.25], 2015, '%'))
                .toEqual([{ name: 2015, value: '5%' },
                          { name: 2016, value: '6.2%' },
                          { name: 2017, value: '10.1%' },
                          { name: 2018, value: '13.25%' } ]);

        expect(getSectionArray([2000000, 100, 1.1], 2012, 'tons'))
                .toEqual([{ name: 2012, value: '2,000,000 tons' },
                          { name: 2013, value: '100 tons' },
                          { name: 2014, value: '1.1 tons' } ]);
    });
});
