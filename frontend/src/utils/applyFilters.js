export default function applyFilters(state) {
    let filteredLocations = state.location.options.slice().filter((location) => location.checked).map((location) => location._id);
    if (filteredLocations.length === 0) {
        filteredLocations = state.location.options.slice().map((location) => location._id);
    }

    let filteredProjects = state.projects.slice().filter((project) => filteredLocations.includes(project.location._id));

    if (state.return.min !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.estimated_annual_return_percent >= parseInt(state.return.min)));
    }
    if (state.return.max !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.estimated_annual_return_percent <= parseInt(state.return.max)));
    }

    if (state.size.min !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.size_kw >= parseInt(state.size.min)));
    }
    if (state.size.max !== "") {
        filteredProjects = filteredProjects.filter((project) => (project.size_kw <= parseInt(state.size.max)));
    }
    
    state.status.options.forEach((option) => {
        if (option.checked) {
            filteredProjects = filteredProjects.filter((project) => project.status === option.name);
        }
    });

    return filteredProjects;
}
