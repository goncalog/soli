export default function getTotal(investments, projects, prop) {
    const total = projects.reduce((sum, project) => {
        let annualAmounts = {};
        let subTotal = 0; 
        for (let i = project.year_start_production; i <= new Date().getFullYear(); i++) {
            subTotal += (investments[project._id][i]) ? investments[project._id][i] : 0;
            const userAnnualShare = subTotal / project.total_cost;
            annualAmounts[i] = (project[prop][i]) ? userAnnualShare * project[prop][i] : 0;
        }

        return sum + Object.values(annualAmounts).reduce((sum, amount) => sum + amount, 0);
    }, 0);

    return (total < 10) ? Math.round(total * 100) / 100 : Math.round(total);
}
