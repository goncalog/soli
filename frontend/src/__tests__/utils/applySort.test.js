import applySort from '../../utils/applySort';

const filtered = [
    { _id: '78123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 60, size_kw: 72000, estimated_total_co2_saved_ton: 200, },
    { _id: '12345', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 30, size_kw: 70000, estimated_total_co2_saved_ton: 300, },
    { _id: '23456', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 80, size_kw: 76000, estimated_total_co2_saved_ton: 400, },
    { _id: '91234', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 42, size_kw: 20000, estimated_total_co2_saved_ton: 350, },
    { _id: '89123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 41, size_kw: 121000, estimated_total_co2_saved_ton: 320, },
    { _id: '78912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 44, size_kw: 77000, estimated_total_co2_saved_ton: 100, },
    { _id: '68123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 50, size_kw: 71000, estimated_total_co2_saved_ton: 500, },
    { _id: '68912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 43, size_kw: 75000, estimated_total_co2_saved_ton: 250, },
    { _id: '34567', location: { _id: '678901', country: 'Belgium' }, estimated_annual_return_percent: 49, size_kw: 120000, estimated_total_co2_saved_ton: 600, },
    { _id: '45678', location: { _id: '678902', country: 'Portugal' }, estimated_annual_return_percent: 48, size_kw: 125000, estimated_total_co2_saved_ton: 340, },
    { _id: '56789', location: { _id: '678903', country: 'South Africa' }, estimated_annual_return_percent: 46, size_kw: 60000, estimated_total_co2_saved_ton: 210, },
];

const highestReturn = {
    options: [
        { name: 'Highest Return', checked: true },
        { name: 'Smallest Size', checked: false }, 
        { name: 'Largest Size', checked: false }, 
        { name: 'Highest CO2 Savings', checked: false }, 
    ]
};

const highestReturnSorted = [
    { _id: '23456', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 80, size_kw: 76000, estimated_total_co2_saved_ton: 400, },
    { _id: '78123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 60, size_kw: 72000, estimated_total_co2_saved_ton: 200, },
    { _id: '68123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 50, size_kw: 71000, estimated_total_co2_saved_ton: 500, },
    { _id: '34567', location: { _id: '678901', country: 'Belgium' }, estimated_annual_return_percent: 49, size_kw: 120000, estimated_total_co2_saved_ton: 600, },
    { _id: '45678', location: { _id: '678902', country: 'Portugal' }, estimated_annual_return_percent: 48, size_kw: 125000, estimated_total_co2_saved_ton: 340, },
    { _id: '56789', location: { _id: '678903', country: 'South Africa' }, estimated_annual_return_percent: 46, size_kw: 60000, estimated_total_co2_saved_ton: 210, },
    { _id: '78912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 44, size_kw: 77000, estimated_total_co2_saved_ton: 100, },
    { _id: '68912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 43, size_kw: 75000, estimated_total_co2_saved_ton: 250, },
    { _id: '91234', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 42, size_kw: 20000, estimated_total_co2_saved_ton: 350, },
    { _id: '89123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 41, size_kw: 121000, estimated_total_co2_saved_ton: 320, },
    { _id: '12345', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 30, size_kw: 70000, estimated_total_co2_saved_ton: 300, },
];

const smallestSize = {
    options: [
        { name: 'Highest Return', checked: false },
        { name: 'Smallest Size', checked: true }, 
        { name: 'Largest Size', checked: false }, 
        { name: 'Highest CO2 Savings', checked: false },
    ]
};

const smallestSizeSorted = [
    { _id: '91234', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 42, size_kw: 20000, estimated_total_co2_saved_ton: 350, },
    { _id: '56789', location: { _id: '678903', country: 'South Africa' }, estimated_annual_return_percent: 46, size_kw: 60000, estimated_total_co2_saved_ton: 210, },
    { _id: '12345', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 30, size_kw: 70000, estimated_total_co2_saved_ton: 300, },
    { _id: '68123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 50, size_kw: 71000, estimated_total_co2_saved_ton: 500, },
    { _id: '78123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 60, size_kw: 72000, estimated_total_co2_saved_ton: 200, },
    { _id: '68912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 43, size_kw: 75000, estimated_total_co2_saved_ton: 250, },
    { _id: '23456', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 80, size_kw: 76000, estimated_total_co2_saved_ton: 400, },
    { _id: '78912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 44, size_kw: 77000, estimated_total_co2_saved_ton: 100, },
    { _id: '34567', location: { _id: '678901', country: 'Belgium' }, estimated_annual_return_percent: 49, size_kw: 120000, estimated_total_co2_saved_ton: 600, },
    { _id: '89123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 41, size_kw: 121000, estimated_total_co2_saved_ton: 320, },
    { _id: '45678', location: { _id: '678902', country: 'Portugal' }, estimated_annual_return_percent: 48, size_kw: 125000, estimated_total_co2_saved_ton: 340, },
];

const largestSize = {
    options: [
        { name: 'Highest Return', checked: false },
        { name: 'Smallest Size', checked: false }, 
        { name: 'Largest Size', checked: true }, 
        { name: 'Highest CO2 Savings', checked: false },
    ]
};

const largestSizeSorted = [
    { _id: '45678', location: { _id: '678902', country: 'Portugal' }, estimated_annual_return_percent: 48, size_kw: 125000, estimated_total_co2_saved_ton: 340, },
    { _id: '89123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 41, size_kw: 121000, estimated_total_co2_saved_ton: 320, },
    { _id: '34567', location: { _id: '678901', country: 'Belgium' }, estimated_annual_return_percent: 49, size_kw: 120000, estimated_total_co2_saved_ton: 600, },
    { _id: '78912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 44, size_kw: 77000, estimated_total_co2_saved_ton: 100, },
    { _id: '23456', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 80, size_kw: 76000, estimated_total_co2_saved_ton: 400, },
    { _id: '68912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 43, size_kw: 75000, estimated_total_co2_saved_ton: 250, },
    { _id: '78123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 60, size_kw: 72000, estimated_total_co2_saved_ton: 200, },
    { _id: '68123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 50, size_kw: 71000, estimated_total_co2_saved_ton: 500, },
    { _id: '12345', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 30, size_kw: 70000, estimated_total_co2_saved_ton: 300, },
    { _id: '56789', location: { _id: '678903', country: 'South Africa' }, estimated_annual_return_percent: 46, size_kw: 60000, estimated_total_co2_saved_ton: 210, },
    { _id: '91234', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 42, size_kw: 20000, estimated_total_co2_saved_ton: 350, },
];

const highestCo2Savings = {
    options: [
        { name: 'Highest Return', checked: false },
        { name: 'Smallest Size', checked: false }, 
        { name: 'Largest Size', checked: false }, 
        { name: 'Highest CO2 Savings', checked: true },
    ]
};

const highestCo2SavingsSorted = [
    { _id: '34567', location: { _id: '678901', country: 'Belgium' }, estimated_annual_return_percent: 49, size_kw: 120000, estimated_total_co2_saved_ton: 600, },
    { _id: '68123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 50, size_kw: 71000, estimated_total_co2_saved_ton: 500, },
    { _id: '23456', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 80, size_kw: 76000, estimated_total_co2_saved_ton: 400, },
    { _id: '91234', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 42, size_kw: 20000, estimated_total_co2_saved_ton: 350, },
    { _id: '45678', location: { _id: '678902', country: 'Portugal' }, estimated_annual_return_percent: 48, size_kw: 125000, estimated_total_co2_saved_ton: 340, },
    { _id: '89123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 41, size_kw: 121000, estimated_total_co2_saved_ton: 320, },
    { _id: '12345', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 30, size_kw: 70000, estimated_total_co2_saved_ton: 300, },
    { _id: '68912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 43, size_kw: 75000, estimated_total_co2_saved_ton: 250, },
    { _id: '56789', location: { _id: '678903', country: 'South Africa' }, estimated_annual_return_percent: 46, size_kw: 60000, estimated_total_co2_saved_ton: 210, },
    { _id: '78123', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 60, size_kw: 72000, estimated_total_co2_saved_ton: 200, },
    { _id: '78912', location: { _id: '67890', country: 'UK' }, estimated_annual_return_percent: 44, size_kw: 77000, estimated_total_co2_saved_ton: 100, },
];

describe('applySort', () => {
    it('returns items correctly sorted', () => {
        expect(applySort(filtered, highestReturn)).toEqual(highestReturnSorted);
        expect(applySort(filtered, smallestSize)).toEqual(smallestSizeSorted);
        expect(applySort(filtered, largestSize)).toEqual(largestSizeSorted);
        expect(applySort(filtered, highestCo2Savings)).toEqual(highestCo2SavingsSorted);
    });
});
