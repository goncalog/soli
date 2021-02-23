const assert = require('chai').assert;
const getData = require('../../utils/getData');

const user = {
    name: 'Ar',
    contact: 'xpto@protonmail.com',
    _id: '1234567'
}

const input = { 
    body: {
        name: 'Project I',
        size: '2000',
        totalCost: '25000',
        totalCostCurrency: '£',
        historicalTotalCost: { 2021: '25000' },
        status: 'Producing',
        estimatedAnnualReturn: '5.5',
        location: 'London',
        imageUrls: ['url1', 'url2'],
        estimatedTotalCo2Saved: '29',
        estimatedAnnualProduction: '218',
        paymentSchedule: 'Quarterly',
        riskLevel: 'Medium',
        yearStartProduction: '2019',  
        realAnnualProductions: ['213', '90'],    
        realAnnualPayments: ['1200', '765'],
        paymentsCurrency: '£',
        realAnnualReturns: ['7', '3.1'],    
        realAnnualCo2Savings: ['12', '5'],
    },
    user: user,
}

const output = {
    name: 'Project I',
    size_kw: '2000',
    total_cost: '25000',
    total_cost_currency: '£',
    historical_total_cost: { 2021: '25000' },
    status: 'Producing',
    estimated_annual_return_percent: '5.5',
    location: 'London',
    image_urls: ['url1', 'url2'],
    owner: user,
    estimated_total_co2_saved_ton: '29',
    estimated_annual_production_kwh: '218',
    payment_schedule: 'Quarterly',
    risk_level: 'Medium',
    year_start_production: '2019',  
    real_annual_production_kwh: ['213', '90'],    
    real_annual_payments: ['1200', '765'],
    payments_currency: '£',
    real_annual_return_percent: ['7', '3.1'],    
    real_annual_co2_saved_ton: ['12', '5'],
}

describe('getData', () => {
    it('returns the correct object', () => {
        assert.deepEqual(getData(input), output, 'getData returns object with project properties');
    });
});
