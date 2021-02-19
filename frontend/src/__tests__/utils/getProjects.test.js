import getProjects from '../../utils/getProjects';
import getSize from '../../utils/getSize';

const london = {
    city: 'London',
    country: 'UK',
    continent: 'Europe',
};

const imageUrls = ['https://placeholder.com/image111', 'https://placeholder.com/image222']; 
const realAnnualProduction = [98000, 132000];
const realAnnualPayments = [10000, 13500];
const realAnnualReturn = [10, 13.5];
const realAnnualCo2Saved = [73, 107];

const rawProjects = [
    {
        _id: '1234567890abc',
        name: 'Star Plaza',
        size_kw: 360,
        total_cost: 100000,
        total_cost_currency: '£',
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
        real_annual_production_kwh: realAnnualProduction,    
        real_annual_payments: realAnnualPayments,
        payments_currency: '£',
        real_annual_return_percent: realAnnualReturn,    
        real_annual_co2_saved_ton: realAnnualCo2Saved,    
    },
    {
        _id: '123456789abc',
        name: 'Star Shade',
        size_kw: 3600,
        total_cost: 500000,
        total_cost_currency: '$',
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
        payments_currency: '$',
        real_annual_return_percent: realAnnualReturn,    
        real_annual_co2_saved_ton: realAnnualCo2Saved,    
    },

];

const investments = {
    '1234567890abc': { 2021: 3000 },
    '123456789abc': { 2019: 2000, 2020: 275 },
    '12345678abc': { 2020: 300 },
};

const projects =  [
    {
        imageUrls: rawProjects[0].image_urls,
        title: rawProjects[0].name,
        size: getSize(rawProjects[0]),
        features: [
            { 
                name: 'Status',
                value: rawProjects[0].status,
            },
            { 
                name: 'Est. Return',
                value: `${rawProjects[0].estimated_annual_return_percent}%`,
            },
            { 
                name: 'Location',
                value: rawProjects[0].location.country,
            },
        ],
        id: rawProjects[0]._id,    
        investmentAmount: undefined,
    },
    {
        imageUrls: rawProjects[1].image_urls,
        title: rawProjects[1].name,
        size: getSize(rawProjects[1]),
        features: [
            { 
                name: 'Status',
                value: rawProjects[1].status,
            },
            { 
                name: 'Est. Return',
                value: `${rawProjects[1].estimated_annual_return_percent}%`,
            },
            { 
                name: 'Location',
                value: rawProjects[1].location.country,
            },
        ],
        id: rawProjects[1]._id,
        investmentAmount: undefined,                
    },
];

const projectsWithInvestments =  [
    {
        imageUrls: rawProjects[0].image_urls,
        title: rawProjects[0].name,
        size: getSize(rawProjects[0]),
        features: [
            { 
                name: 'Status',
                value: rawProjects[0].status,
            },
            { 
                name: 'Est. Return',
                value: `${rawProjects[0].estimated_annual_return_percent}%`,
            },
            { 
                name: 'Location',
                value: rawProjects[0].location.country,
            },
        ],
        id: rawProjects[0]._id,
        investmentAmount: 3000,              
    },
    {
        imageUrls: rawProjects[1].image_urls,
        title: rawProjects[1].name,
        size: getSize(rawProjects[1]),
        features: [
            { 
                name: 'Status',
                value: rawProjects[1].status,
            },
            { 
                name: 'Est. Return',
                value: `${rawProjects[1].estimated_annual_return_percent}%`,
            },
            { 
                name: 'Location',
                value: rawProjects[1].location.country,
            },
        ],
        id: rawProjects[1]._id,
        investmentAmount: 2275,
    },
];

describe('getProjects', () => {
    it('returns projects correctly', () => {
        expect(getProjects(rawProjects)).toEqual(projects);
        expect(getProjects(rawProjects, investments)).toEqual(projectsWithInvestments);
    });
});
