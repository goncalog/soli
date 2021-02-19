export default function getTotal(investments, projects, prop) {
    const total = projects.reduce((sum, project) => {
        const projectInvestment = Object.values(investments[project._id]).reduce((sum, amount) => {
            return sum + amount;
        }, 0);
        const projectShare = projectInvestment / project.total_cost;
        return sum + projectShare * project[prop].reduce((sum, amount) => sum + amount, 0);
    }, 0);

    return (total < 10) ? Math.round(total * 100) / 100 : Math.round(total);
}
