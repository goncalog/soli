import React from 'react';
import Filters from '../support/Filters';
import ProjectsContainer from '../support/ProjectsContainer';
import '../../css/Projects.css';
import formatNumber from '../../utils/formatNumber';
import applyFilters from '../../utils/applyFilters';
import applySort from '../../utils/applySort';
import sortString from '../../utils/sortString';

export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            projects: [],
            filteredProjects: [],
            return: { property: 'return', title: 'Return', min: "", max: "",},
            location: { property: 'location', title: 'Location', options: [], },
            size: { property: 'size', title: 'Size', min: "", max: "",},
            status: { 
                property: 'status', 
                title: 'Status', 
                options: [
                    { name: 'Planning' }, 
                    { name: 'Funding' }, 
                    { name: 'Installing' },
                    { name: 'Producing' },
                ], 
            },
            sort: { 
                property: 'sort', 
                title: 'Sort', 
                options: [
                    { name: 'Highest Return', checked: true }, { name: 'Smallest Size' }, 
                    { name: 'Largest Size' }, { name: 'Highest CO2 Savings' },
                ], 
            },
            filterVisibility: { 
                return: false, location: false, size: false, status: false, sort: false 
            },
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleClick(property) {
        this.setState({ filterVisibility: { [property]: !this.state.filterVisibility[property] }});
    }

    handleTextChange(property, type, text) {
        this.setState({ [property]:  { ...this.state[property], [type]: text }});
    }

    handleOptionChange(prop, i) {
        let options = this.state[prop].options.slice();

        if (prop === 'sort') {
            options = options.map((option, index) => {
                (index === parseInt(i)) ? option.checked = true : option.checked = false;
                return option;
            });
        } else {
            options[i].checked = !options[i].checked;
        }

        this.setState({ [prop]: { ...this.state[prop], options: options }});
    }

    componentDidMount() {
        // Scroll to top of page
        window.scrollTo(0, 0);

        // Upload database data
        fetch(this.props.fetchUrl)
            .then(res => res.json())
            .then((res) => { this.setState({ projects: res.projects, filteredProjects: applySort(res.projects, this.state.sort) }) })

        // Fetch locations
        if (this.state.location.options.length === 0) {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content/locations` 
                    : `${process.env.REACT_APP_SERVER_URL}/content/locations`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    res.locations.forEach((location) => location['checked'] = false);
                    this.setState({ location: { ...this.state.location, options: sortString(res.locations, 'country') }}); 
                })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.return !== this.state.return ||
            prevState.location !== this.state.location ||
            prevState.size !== this.state.size ||
            prevState.status !== this.state.status ||
            prevState.sort !== this.state.sort
        ) {
            this.setState({ filteredProjects: applySort(applyFilters(this.state), this.state.sort) });
        }
    }

    render() {
        const projects = this.state.filteredProjects.map((item) => {
            let project = {
                imageUrls: item.image_urls,
                title: item.name,
                size: `${item.size_kw} kW | ${item.total_cost_currency}${item.total_cost}`,
                features: [
                    { 
                        name: 'Status',
                        value: item.status,
                    },
                    { 
                        name: 'Est. Return',
                        value: `${item.estimated_annual_return_percent}%`,
                    },
                    { 
                        name: 'Location',
                        value: item.location.country,
                    },
                ],
                id: item._id,                
            };
            return project;
        });

        return (
            <div className="projects">
                {!this.props.fetchUrl.split('/').includes('owner') && (
                    <Filters 
                    return={this.state.return}
                    location={this.state.location}
                    size={this.state.size}
                    status={this.state.status}
                    sort={this.state.sort}
                    visibility={this.state.filterVisibility}
                    onClick={this.handleClick}
                    onTextChange={this.handleTextChange}
                    onOptionChange={this.handleOptionChange}
                    />
                )}
                <ProjectsContainer projects={projects} {...this.props} />
            </div>
        );
    }
}
