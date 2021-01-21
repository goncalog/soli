import removeDuplicates from '../../utils/removeDuplicates';

describe('removeDuplicates', () => {
    const makes = [
        { _id: '123124134', name: 'Tesla' },
        { _id: '12312413', name: 'Nissan' },
        { _id: '12312414', name: 'Renault' },
        { _id: '12312434', name: 'Tesla' },
        { _id: '12312134', name: 'Mercedes-Benz' },
        { _id: '12314134', name: 'Renault' },
    ];

    const makesWithoutDuplicates = [
        { _id: '123124134', name: 'Tesla' },
        { _id: '12312413', name: 'Nissan' },
        { _id: '12312414', name: 'Renault' },
        { _id: '12312134', name: 'Mercedes-Benz' },
    ];

    it('removes duplicates ', () => {
        expect(removeDuplicates(makes, 'name')).toEqual(makesWithoutDuplicates);
    });

    const locations = [
        { _id: '123124134', city: 'London' },
        { _id: '12312413', city: 'Lisbon' },
        { _id: '12312414', city: 'Lisbon' },
        { _id: '12312434', city: 'Ostend' },
        { _id: '12312134', city: 'Lisbon' },
        { _id: '12314134', city: 'Cabo' },
    ];

    const locationsWithoutDuplicates = [
        { _id: '123124134', city: 'London' },
        { _id: '12312413', city: 'Lisbon' },
        { _id: '12312434', city: 'Ostend' },
        { _id: '12314134', city: 'Cabo' },
    ];

    it('removes duplicates ', () => {
        expect(removeDuplicates(locations, 'city')).toEqual(locationsWithoutDuplicates);
    });
});
