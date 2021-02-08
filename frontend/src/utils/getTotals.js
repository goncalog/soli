import formatNumber from './formatNumber';

export default function getTotals(investments, projects) {
    // Assumes all investments are in £
    const totalInvested = Object.values(investments).reduce((sum, amount) => {
        return sum + amount;
    }, 0);

    const totalProduced = 0;
    const totalCO2Saved = 0;
    const totalReceived = 0;

    return [
        formatNumber(totalInvested), 
        formatNumber(totalProduced),
        formatNumber(totalCO2Saved),
        formatNumber(totalReceived),
    ];
}
