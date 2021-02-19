import formatNumber from './formatNumber';

export default function getSectionArray(sectionArray, unit) {
    return Object.keys(sectionArray).map((year) => {

        if (unit === '%') {
            return { name: year, value: `${sectionArray[year]}${unit}` };
        
        } else if (unit === 'tons' || unit === 'kWh') {
            return { name: year, value: `${formatNumber(sectionArray[year])} ${unit}` };
        
        } else {
            // Currency (for payments section)
            return { name: year, value: `${unit}${formatNumber(sectionArray[year])}` };
        } 
    });
}
