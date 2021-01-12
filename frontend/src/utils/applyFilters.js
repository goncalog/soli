export default function applyFilters(state) {
    let filteredMakes = state.make.options.slice().filter((make) => make.checked).map((make) => make._id);
    if (filteredMakes.length === 0) {
        filteredMakes = state.make.options.slice().map((make) => make._id);
    }

    let filteredEvs = state.evs.slice().filter((ev) => filteredMakes.includes(ev.make._id));

    if (state.price.min !== "") {
        filteredEvs = filteredEvs.filter((ev) => (ev.price_per_day >= parseInt(state.price.min)));
    }
    if (state.price.max !== "") {
        filteredEvs = filteredEvs.filter((ev) => (ev.price_per_day <= parseInt(state.price.max)));
    }

    if (state.range.min !== "") {
        filteredEvs = filteredEvs.filter((ev) => (ev.model.charging.range_miles >= parseInt(state.range.min)));
    }
    if (state.range.max !== "") {
        filteredEvs = filteredEvs.filter((ev) => (ev.model.charging.range_miles <= parseInt(state.range.max)));
    }

    state.included.options.forEach((option) => {
        if (option.checked) {
            filteredEvs = filteredEvs.filter((ev) => ev.included_extras.includes(option.name));
        }
    });

    return filteredEvs;
}
