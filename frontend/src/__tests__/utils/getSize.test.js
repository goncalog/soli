import getSize from '../../utils/getSize';

describe('getSize', () => {
    const project = {
        size_kw: 325,
        total_cost: 550000,
        total_cost_currency: '£',
    }

    const projectTwo = {
        size_kw: 1200,
        total_cost: 12000000,
        total_cost_currency: '$',
    }

    it('returns size in correct format', () => {
        expect(getSize(project)).toEqual('325 kW | £550,000');
        expect(getSize(projectTwo)).toEqual('1,200 kW | $12,000,000');
    });
});
