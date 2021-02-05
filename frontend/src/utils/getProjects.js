import getSize from './getSize';

export default function getProjects(rawProjects) {
    return rawProjects.map((item) => {
        return {
            imageUrls: item.image_urls,
            title: item.name,
            size: getSize(item),
            features: [
                { 
                    name: 'Status',
                    value: item.status,
                },
                { 
                    name: 'Est. Return',
                    value: `${item.estimated_annual_return_percent}%`,
                },
                { 
                    name: 'Location',
                    value: item.location.country,
                },
            ],
            id: item._id,                
        };
    });
}
