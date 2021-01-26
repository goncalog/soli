import formatNumber from './formatNumber';

export default function getSectionArray(sectionArray, startYear, unit) {
    return sectionArray.map((item, index) => {

        if (unit === '%') {
            return { name: startYear + index, value: `${item}${unit}` };
        
        } else if (unit === 'tons' || unit === 'kWh') {
            return { name: startYear + index, value: `${formatNumber(item)} ${unit}` };
        
        } else {
            // Currency (for payments section)
            return { name: startYear + index, value: `${unit}${formatNumber(item)}` };
        } 
    });
}
