import formatNumber from './formatNumber';
import getTotal from './getTotal';
import formatTotal from './formatTotal';

export default function getTotals(investments, projects) {
    // Assumes all investments are in £
    const totalInvested = Object.values(investments).reduce((sum, project) => {
        return sum + Object.values(project).reduce((sum, amount) => {
            return sum + amount;
        }, 0);
    }, 0);

    const totalCapacity = projects.reduce((sum, project) => {
        const investment = Object.values(investments[project._id]).reduce((sum, amount) => sum + amount, 0);
        const projectTotalCost = (project.historical_total_cost[new Date().getFullYear()]) 
                ? project.historical_total_cost[new Date().getFullYear()] 
                : project.historical_total_cost[new Date().getFullYear() - 1];
        const userShare = investment / projectTotalCost;

        return sum + project.size_kw * userShare;
    }, 0);

    const totalProduced = getTotal(investments, projects, 'real_annual_production_kwh');
    const totalCO2Saved = getTotal(investments, projects, 'real_annual_co2_saved_ton');
    const totalReceived = getTotal(investments, projects, 'real_annual_payments');
    const totalReturn = 0;

    return [
        formatNumber(totalInvested), 
        formatNumber(formatTotal(totalCapacity)), 
        formatNumber(totalProduced),
        formatNumber(totalCO2Saved),
        formatNumber(totalReceived),
        formatNumber(totalReturn),
    ];
}
