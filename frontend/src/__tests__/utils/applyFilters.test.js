import applyFilters from '../../utils/applyFilters';

const state = {
    projects: [
        { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price_per_day: 50, model: { charging: { range_miles: 300 }}, included_extras: ['A/C', 'Insurance'] },
        { _id: '12345', make: { _id: '67890', name: 'Tesla' }, price_per_day: 30, model: { charging: { range_miles: 300 }}, included_extras: ['A/C', 'Insurance'] },
        { _id: '23456', make: { _id: '67890', name: 'Tesla' }, price_per_day: 80, model: { charging: { range_miles: 300 }}, included_extras: ['A/C', 'Insurance'] },
        { _id: '78912', make: { _id: '67890', name: 'Tesla' }, price_per_day: 40, model: { charging: { range_miles: 100 }}, included_extras: ['A/C', 'Insurance'] },
        { _id: '68123', make: { _id: '67890', name: 'Tesla' }, price_per_day: 50, model: { charging: { range_miles: 500 }}, included_extras: ['A/C', 'Insurance'] },
        { _id: '68912', make: { _id: '67890', name: 'Tesla' }, price_per_day: 40, model: { charging: { range_miles: 200 }}, included_extras: ['A/C'] },
        { _id: '34567', make: { _id: '678901', name: 'Renault' }, price_per_day: 40, model: { charging: { range_miles: 300 }}, included_extras: ['A/C', 'Insurance'] },
        { _id: '45678', make: { _id: '678902', name: 'Nissan' }, price_per_day: 40, model: { charging: { range_miles: 300 }}, included_extras: ['A/C', 'Insurance'] },
        { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price_per_day: 45, model: { charging: { range_miles: 200 }}, included_extras: ['Insurance'] },
    ],
    make: { 
        options: [
            { _id: '67890', name: 'Tesla', checked: true },
            { _id: '678901', name: 'Renault', checked: false },
            { _id: '678902', name: 'Nissan', checked: false },
            { _id: '678903', name: 'Jaguar', checked: true },
        ]
    },
    price: { min: '35', max: '60' },
    range: { min: '150', max: '400' },
    included: { options: [{ name: 'Insurance', checked: true }] },
};

const filteredEvs =  [
    { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price_per_day: 50, model: { charging: { range_miles: 300 }}, included_extras: ['A/C', 'Insurance'] },
    { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price_per_day: 45, model: { charging: { range_miles: 200 }}, included_extras: ['Insurance'] },
];

describe('applyFilters', () => {
    it('returns filtered Projects correctly', () => {
        expect(applyFilters(state)).toEqual(filteredEvs);
    });
});
