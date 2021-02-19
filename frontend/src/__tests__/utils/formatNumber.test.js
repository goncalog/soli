import formatNumber from '../../utils/formatNumber';

describe('formatNumber', () => {
    it('returns number in correct format (1)', () => {
        expect(formatNumber(123)).toEqual('123');
        expect(formatNumber(0)).toEqual('0');
        expect(formatNumber(45)).toEqual('45');
        expect(formatNumber(6789)).toEqual('6,789');
        expect(formatNumber(100000)).toEqual('100,000');
        expect(formatNumber(123456)).toEqual('123,456');
        expect(formatNumber(1000000)).toEqual('1,000,000');
        expect(formatNumber(1234567)).toEqual('1,234,567');
        expect(formatNumber(1000000000)).toEqual('1,000,000,000');
        expect(formatNumber(1234567890)).toEqual('1,234,567,890');
    });

    it('returns number in correct format (2)', () => {
        expect(formatNumber('123')).toEqual('123');
        expect(formatNumber('0')).toEqual('0');
        expect(formatNumber('45')).toEqual('45');
        expect(formatNumber('6789')).toEqual('6,789');
        expect(formatNumber('100000')).toEqual('100,000');
        expect(formatNumber('123456')).toEqual('123,456');
        expect(formatNumber('1000000')).toEqual('1,000,000');
        expect(formatNumber('1234567')).toEqual('1,234,567');
        expect(formatNumber('1000000000')).toEqual('1,000,000,000');
        expect(formatNumber('1234567890')).toEqual('1,234,567,890');
    });

    it('returns number in correct format (3)', () => {
        expect(formatNumber(123.4)).toEqual('123.4');
        expect(formatNumber(45.2)).toEqual('45.2');
        expect(formatNumber(6789.5)).toEqual('6,789.5');
        expect(formatNumber(100000.45)).toEqual('100,000.45');
        expect(formatNumber(123456.33)).toEqual('123,456.33');
        expect(formatNumber(1000000.11)).toEqual('1,000,000.11');
        expect(formatNumber(1234567.345)).toEqual('1,234,567.345');
        expect(formatNumber(1000000000.767)).toEqual('1,000,000,000.767');
        expect(formatNumber(1234567890.107)).toEqual('1,234,567,890.107');
    });
});
