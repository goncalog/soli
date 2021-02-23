import formatNumber from './formatNumber';
import getTotal from './getTotal';

export default function getTotals(investments, projects) {
    // Assumes all investments are in £
    const totalInvested = Object.values(investments).reduce((sum, project) => {
        return sum + Object.values(project).reduce((sum, amount) => {
            return sum + amount;
        }, 0);
    }, 0);

    const totalProduced = getTotal(investments, projects, 'real_annual_production_kwh');
    const totalCO2Saved = getTotal(investments, projects, 'real_annual_co2_saved_ton');
    const totalReceived = getTotal(investments, projects, 'real_annual_payments');

    return [
        formatNumber(totalInvested), 
        formatNumber(totalProduced),
        formatNumber(totalCO2Saved),
        formatNumber(totalReceived),
    ];
}
