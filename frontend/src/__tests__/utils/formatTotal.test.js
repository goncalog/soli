import formatTotal from '../../utils/formatTotal';

describe('formatTotal', () => {
    it('returns totals correctly', () => {
        expect(formatTotal(0.7537)).toEqual(0.75);
        expect(formatTotal(0.7)).toEqual(0.70);
        expect(formatTotal(9.7777)).toEqual(9.78);
        expect(formatTotal(10.111)).toEqual(10);
        expect(formatTotal(101.111)).toEqual(101);
    });
});
