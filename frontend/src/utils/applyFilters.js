export default function applyFilters(state) {
    let filteredMakes = state.make.options.slice().filter((make) => make.checked).map((make) => make._id);
    if (filteredMakes.length === 0) {
        filteredMakes = state.make.options.slice().map((make) => make._id);
    }

    let filteredProjects = state.projects.slice().filter((project) => filteredMakes.includes(project.make._id));

    if (state.price.min !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.price_per_day >= parseInt(state.price.min)));
    }
    if (state.price.max !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.price_per_day <= parseInt(state.price.max)));
    }

    if (state.range.min !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.model.charging.range_miles >= parseInt(state.range.min)));
    }
    if (state.range.max !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.model.charging.range_miles <= parseInt(state.range.max)));
    }

    state.included.options.forEach((option) => {
        if (option.checked) {
            filteredProjects = filteredProjects.filter((project) => project.included_extras.includes(option.name));
        }
    });

    return filteredProjects;
}
