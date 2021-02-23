import getTotal from '../../utils/getTotal';

const investments = {
    '1234567890': { 2017: 1000, 2018: 5000, 2021: 10000 },
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
        historical_total_cost: { 
            2015: 249000000, 
            2016: 272000000, 
            2017: 504000000, 
            2018: 639000000, 
            2019: 683000000, 
            2020: 593000000,
            2021: 593000000,
        },
        status: 'Producing',    
        payment_schedule: 'Quarterly',
        year_start_production: 2015,
        real_annual_production_kwh: { 
            2015: 23000000, 
            2016: 225000000, 
            2017: 394000000, 
            2018: 451000000, 
            2019: 693000000, 
            2020: 712000000 
        },    
        real_annual_payments: {
            2015: 10946000, 
            2016: 17372000, 
            2017: 20681000, 
            2018: 34800000, 
            2019: 38100000, 
            2020: 39700000
        },
        payments_currency: '£',
        real_annual_return_percent: {
            2015: 5.1, 
            2016: 6.4, 
            2017: 5.72, 
            2018: 5.8, 
            2019: 5.65, 
            2020: 6.78
        },    
        real_annual_co2_saved_ton: {
            2015: 11615, 
            2016: 104179, 
            2017: 156560, 
            2018: 158600, 
            2019: 299000, 
            2020: 307500
        },    
    },
    {
        _id: '0987654321',
        name: 'Spar Plaza',
        size_kw: 360,
        total_cost: 256500,
        total_cost_currency: '£',
        historical_total_cost: { 2021: 256500, },
        status: 'Funding',    
        payment_schedule: 'Monthly',
        year_start_production: 2021,
        real_annual_production_kwh: {},    
        real_annual_payments: {},
        payments_currency: '£',
        real_annual_return_percent: {},    
        real_annual_co2_saved_ton: {},    
    },
    {
        _id: '12345678900987654321',
        name: 'North Kensington Community Energy',
        size_kw: 224,
        total_cost: 190000,
        total_cost_currency: '£',
        historical_total_cost: { 2020: '87000', 2021: '190000', },
        status: 'Producing',
        payment_schedule: 'Annually',
        year_start_production: 2020,
        real_annual_production_kwh: { 2020: 58530 },    
        real_annual_payments: { 2020: 4711 },
        payments_currency: '£',
        real_annual_return_percent: { 2020: 2 },    
        real_annual_co2_saved_ton: { 2020: 15 },    
    },
];

describe('getTotal', () => {
    it('returns totals correctly', () => {
        expect(getTotal(investments, projects, 'real_annual_production_kwh')).toEqual(18376);
        expect(getTotal(investments, projects, 'real_annual_co2_saved_ton')).toEqual(7.56);
        expect(getTotal(investments, projects, 'real_annual_payments')).toEqual(1110);
    });
});
