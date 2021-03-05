import getTotals from '../../utils/getTotals';
import getTotal from '../../utils/getTotal';
import formatNumber from '../../utils/formatNumber';

const investments = {
    '1234567890': { 2021: 3000 },
    '0987654321': { 2020: 300 },
    '12345678900987654321': { 2019: 2000, 2020: 275 },
}

const london = {
    city: 'London',
    country: 'UK',
    continent: 'Europe',
};

const imageUrls = ['https://placeholder.com/image111', 'https://placeholder.com/image222']; 
const realAnnualProduction = { 2019: 98000, 2020: 132000 };
const realAnnualPayments = { 2019: 10000, 2020: 13500 };
const realAnnualReturn = { 2019: 10, 2020: 13.5 };
const realAnnualCo2Saved = { 2019: 73, 2020: 107 };

const projects = [
    {
        _id: '1234567890',
        name: 'Star Plaza',
        size_kw: 360,
        total_cost: 100000,
        total_cost_currency: '£',
        historical_total_cost: { 2021: 100000, },
        status: 'Funding',    
        estimated_annual_return_percent: 12.45,
        location: london,
        owner: '12345678901234567890',
        image_urls: imageUrls,
        estimated_total_co2_saved_ton: 1200,
        estimated_annual_production_kwh: 125000,
        payment_schedule: 'Monthly',
        risk_level: 'Medium',
        year_start_production: 2021,
        real_annual_production_kwh: {},    
        real_annual_payments: {},
        payments_currency: '£',
        real_annual_return_percent: {},    
        real_annual_co2_saved_ton: {},    
    },
    {
        _id: '0987654321',
        name: 'Star Square',
        size_kw: 360,
        total_cost: 100000,
        total_cost_currency: '£',
        historical_total_cost: { 2021: 100000, },
        status: 'Funding',    
        estimated_annual_return_percent: 12.45,
        location: london,
        owner: '12345678901234567890',
        image_urls: imageUrls,
        estimated_total_co2_saved_ton: 1200,
        estimated_annual_production_kwh: 125000,
        payment_schedule: 'Monthly',
        risk_level: 'Medium',
        year_start_production: 2021,
        real_annual_production_kwh: {},    
        real_annual_payments: {},
        payments_currency: '£',
        real_annual_return_percent: {},    
        real_annual_co2_saved_ton: {},    
    },
    {
        _id: '12345678900987654321',
        name: 'Star Shade',
        size_kw: 3600,
        total_cost: 500000,
        total_cost_currency: '£',
        historical_total_cost: { 2019: 100000, 2020: 250000, 2021: 500000, },
        status: 'Producing',
        estimated_annual_return_percent: 10.45,
        location: london,
        owner: '1234567890',
        image_urls: imageUrls,
        estimated_total_co2_saved_ton: 100,
        estimated_annual_production_kwh: 125,
        payment_schedule: 'Quarterly',
        risk_level: 'High',
        year_start_production: 2019,
        real_annual_production_kwh: realAnnualProduction,    
        real_annual_payments: realAnnualPayments,
        payments_currency: '£',
        real_annual_return_percent: realAnnualReturn,    
        real_annual_co2_saved_ton: realAnnualCo2Saved,    
    },

];

const results =  [
    formatNumber(5575),
    formatNumber(28),
    formatNumber(getTotal(investments, projects, 'real_annual_production_kwh')), 
    formatNumber(getTotal(investments, projects, 'real_annual_co2_saved_ton')), 
    formatNumber(getTotal(investments, projects, 'real_annual_payments')),
    formatNumber(0),
];

describe('getTotals', () => {
    it('returns totals correctly', () => {
        expect(getTotals(investments, projects)).toEqual(results);
    });
});
