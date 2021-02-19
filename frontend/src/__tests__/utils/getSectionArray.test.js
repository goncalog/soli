import getSectionArray from '../../utils/getSectionArray';

describe('getSectionArray', () => {
    it('returns the right array', () => {
        expect(getSectionArray({ 2015: 2000, 2016: 10000, 2017: 100, 2018: 1 }, 'kWh'))
                .toEqual([{ name: '2015', value: '2,000 kWh' },
                          { name: '2016', value: '10,000 kWh' },
                          { name: '2017', value: '100 kWh' },
                          { name: '2018', value: '1 kWh' } ]);

        expect(getSectionArray({ 2009: 2000, 2010: 10000, 2011: 100, 2012: 1 }, '£'))
                .toEqual([{ name: '2009', value: '£2,000' },
                          { name: '2010', value: '£10,000' },
                          { name: '2011', value: '£100' },
                          { name: '2012', value: '£1' } ]);

        expect(getSectionArray({ 2015: 5, 2016: 6.2, 2017: 10.1, 2018: 13.25 }, '%'))
                .toEqual([{ name: '2015', value: '5%' },
                          { name: '2016', value: '6.2%' },
                          { name: '2017', value: '10.1%' },
                          { name: '2018', value: '13.25%' } ]);

        expect(getSectionArray({ 2012: 2000000, 2013: 100, 2014: 1.1 }, 'tons'))
                .toEqual([{ name: '2012', value: '2,000,000 tons' },
                          { name: '2013', value: '100 tons' },
                          { name: '2014', value: '1.1 tons' } ]);
    });
});
