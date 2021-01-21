export default function applySort(filteredEVs, sortState) {
    const sortOption = sortState.options.filter((option) => option.checked)[0];

    switch(sortOption.name) {
        case 'Highest Return':
            filteredEVs.sort((a, b) => b.estimated_annual_return_percent - a.estimated_annual_return_percent);
            break;

        case 'Smallest Size':
            filteredEVs.sort((a, b) => a.size_kw - b.size_kw);
            break;

        case 'Largest Size':
            filteredEVs.sort((a, b) => b.size_kw - a.size_kw);
            break;

        case 'Highest CO2 Savings':
            filteredEVs.sort((a, b) => b.estimated_total_co2_saved_ton - a.estimated_total_co2_saved_ton);
            break;

        default:
            break;
    }
    return filteredEVs;
}
