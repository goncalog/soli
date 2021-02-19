import getTotal from '../../utils/getTotal';

const investments = {
    '1234567890': { 2021: 10000 },
    '0987654321': { 2021: 110 },
    '12345678900987654321': { 2020: 100 },
}

const projects = [
    {
        _id: '1234567890',
        name: 'NextEnergy',
        size_kw: 360,
        total_cost: 994000000,
        total_cost_currency: '£',
        status: 'Producing',    
        payment_schedule: 'Quarterly',
        year_start_production: 2015,
        real_annual_production_kwh: [23000000, 225000000, 394000000, 451000000, 693000000, 712000000],    
        real_annual_payments: [10946000, 17372000, 20681000, 34800000, 38100000, 39700000],
        payments_currency: '£',
        real_annual_return_percent: [5.1, 6.4, 5.72, 5.8, 5.65, 6.78],    
        real_annual_co2_saved_ton: [11615, 104179, 156560, 158600, 299000, 307500],    
    },
    {
        _id: '0987654321',
        name: 'Spar Plaza',
        size_kw: 360,
        total_cost: 256500,
        total_cost_currency: '£',
        status: 'Funding',    
        payment_schedule: 'Monthly',
        year_start_production: 2021,
        real_annual_production_kwh: [],    
        real_annual_payments: [],
        payments_currency: '£',
        real_annual_return_percent: [],    
        real_annual_co2_saved_ton: [],    
    },
    {
        _id: '12345678900987654321',
        name: 'North Kensington Community Energy',
        size_kw: 224,
        total_cost: 190000,
        total_cost_currency: '£',
        status: 'Producing',    
        payment_schedule: 'Annually',
        year_start_production: 2020,
        real_annual_production_kwh: [58530],    
        real_annual_payments: [4711],
        payments_currency: '£',
        real_annual_return_percent: [2],    
        real_annual_co2_saved_ton: [15],    
    },
];

describe('getTotal', () => {
    it('returns totals correctly', () => {
        expect(getTotal(investments, projects, 'real_annual_production_kwh')).toEqual(30.8);
        expect(getTotal(investments, projects, 'real_annual_co2_saved_ton')).toEqual(0.01);
    });
});
