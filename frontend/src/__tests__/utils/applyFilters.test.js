import applyFilters from '../../utils/applyFilters';

const state = {
    projects: [
        { _id: '78123', location: { _id: '67890', country: 'UK' }, size_kw: 50, estimated_annual_return_percent: 300, status: 'Producing' },
        { _id: '12345', location: { _id: '67890', country: 'UK' }, size_kw: 30, estimated_annual_return_percent: 300, status: 'Producing' },
        { _id: '23456', location: { _id: '67890', country: 'UK' }, size_kw: 80, estimated_annual_return_percent: 300, status: 'Producing' },
        { _id: '78912', location: { _id: '67890', country: 'UK' }, size_kw: 40, estimated_annual_return_percent: 100, status: 'Producing' },
        { _id: '68123', location: { _id: '67890', country: 'UK' }, size_kw: 50, estimated_annual_return_percent: 500, status: 'Producing' },
        { _id: '68912', location: { _id: '67890', country: 'UK' }, size_kw: 40, estimated_annual_return_percent: 200, status: 'Planning' },
        { _id: '34567', location: { _id: '678901', country: 'Belgium' }, size_kw: 40, estimated_annual_return_percent: 300, status: 'Producing' },
        { _id: '45678', location: { _id: '678902', country: 'Portugal' }, size_kw: 40, estimated_annual_return_percent: 300, status: 'Producing' },
        { _id: '56789', location: { _id: '678903', country: 'South Africa' }, size_kw: 45, estimated_annual_return_percent: 200, status: 'Producing' },
    ],
    location: { 
        options: [
            { _id: '67890', country: 'UK', checked: true },
            { _id: '678901', country: 'Belgium', checked: false },
            { _id: '678902', country: 'Portugal', checked: false },
            { _id: '678903', country: 'South Africa', checked: true },
        ]
    },
    size: { min: '35', max: '60' },
    return: { min: '150', max: '400' },
    status: { options: [{ name: 'Producing', checked: true }] },
};

const filteredEvs =  [
    { _id: '78123', location: { _id: '67890', country: 'UK' }, size_kw: 50, estimated_annual_return_percent: 300, status: 'Producing' },
    { _id: '56789', location: { _id: '678903', country: 'South Africa' }, size_kw: 45, estimated_annual_return_percent: 200, status: 'Producing' },
];

describe('applyFilters', () => {
    it('returns filtered Projects correctly', () => {
        expect(applyFilters(state)).toEqual(filteredEvs);
    });
});
