import getAnnuals from '../../utils/getAnnuals';

describe('getAnnuals', () => {
    it('returns annuals Object correctly', () => {
        expect(getAnnuals([1000, 2000, 3000], 2015)).toEqual({ 2015: 1000, 2016: 2000, 2017: 3000 });
        expect(getAnnuals([1000, 2000, 3000], 2019)).toEqual({ 2019: 1000, 2020: 2000, 2021: 3000 });
        expect(getAnnuals([1000, 2000, 3000], 2020)).toEqual({ 2020: 1000, 2021: 2000 });
        expect(getAnnuals([1000, 2000, 3000], '2015')).toEqual({ 2015: 1000, 2016: 2000, 2017: 3000 });
        expect(getAnnuals([1000, 2000, 3000], '2019')).toEqual({ 2019: 1000, 2020: 2000, 2021: 3000 });
        expect(getAnnuals([1000, 2000, 3000], '2020')).toEqual({ 2020: 1000, 2021: 2000 });
    });
});
