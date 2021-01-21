import React from 'react';
import Title from '../support/Title';
import Size from '../support/Size';
import OwnerContact from '../support/OwnerContact';
import Detail from '../support/Detail';
import formatRating from '../../utils/formatRating';
import formatNumber from '../../utils/formatNumber';
import getEvFeaturesArray from '../../utils/getEvFeaturesArray';
import getImagePosForSlider from '../../utils/getImagePosForSlider';
import '../../css/Project.css';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            project: {}, 
            currentImage: 0,
            sectionsVisibility: [true, false, false, false, false], 
        };
        this.handleChangeImageButtonClick = this.handleChangeImageButtonClick.bind(this);
        this.handleChangeSectionsVisibility = this.handleChangeSectionsVisibility.bind(this);
    }

    handleChangeImageButtonClick(buttonType) {
        if (buttonType === 'next') {
            this.setState((state) => ({ currentImage: state.currentImage + 1 }));
        } else if (buttonType === 'previous') {
            this.setState((state) => ({ currentImage: state.currentImage - 1 }));
        }
    }

    handleChangeSectionsVisibility(section) {
        this.setState((state) => { 
            let sectionsVisibility = state.sectionsVisibility.slice(); // Creating a new copy
            sectionsVisibility[section] = !sectionsVisibility[section];
            return { sectionsVisibility };
        });
    }

    componentDidMount() {
        // Scroll to top of page
        window.scrollTo(0, 0);

        // Upload database data
        let projectUrl;
        
        if (process.env.NODE_ENV === 'production') {
            projectUrl = `/content/project/${this.props.match.params.id}`;
        } else {
            projectUrl = `${process.env.REACT_APP_SERVER_URL}/content/project/${this.props.match.params.id}`;
        }

        fetch(projectUrl)
            .then((res) => res.json())
            .then((res) => { this.setState({ project: res.project }) })
    }

    render() {
        let project = {
            title: '', 
            price: '',
            owner: { 
                name: '', 
                rating: '', 
                callToActionText: '',
                contact: '',
                id: '', 
            },
            detail: { 
                imagePath: '', 
                projectFeatures: [], 
                sectionsVisibility: [], 
                sections: [], 
                onChangeImageButtonClick: this.handleChangeImageButtonClick, 
                onChangeSectionsVisibility: this.handleChangeSectionsVisibility, 
            },
        }

        if (Object.keys(this.state.project).length > 0) {
            const imagePath = this.state.project.image_urls[
                getImagePosForSlider(this.state.project.image_urls.length, this.state.currentImage)
            ];
            
            project = {
                title: this.state.project.name,
                price: this.state.project.price_per_day.toString(),
                owner: {
                    name: this.state.project.owner.name,
                    rating: this.state.project.owner.rating,
                    callToActionText: 'Contact Owner',
                    contact: this.state.project.owner.contact,
                    id: this.state.project.owner._id,
                },
                detail: {
                    imagePath: imagePath,
                    projectFeatures: [
                        { 
                            name: 'Deposit',
                            value: `£${formatNumber(this.state.project.deposit)}`,
                        },
                        { 
                            name: 'Min Rental',
                            value: this.state.project.min_rental_period,
                        },
                        { 
                            name: 'Range',
                            value: this.state.project.model.charging.range_miles,
                        },
                        { 
                            name: 'Year',
                            value: this.state.project.year,
                        },
                        { 
                            name: 'Location',
                            value: this.state.project.location.name,
                        },
                        { 
                            name: 'Full Charge',
                            value: `${this.state.project.model.charging.hours_to_charge}h`,
                        },
                        { 
                            name: '',
                            value: '',
                        },
                        { 
                            name: 'Rating',
                            value: formatRating(this.state.project.model.rating),
                        },
                    ],
                    sectionsVisibility: this.state.sectionsVisibility,
                    sections: [
                        {
                            name: 'Included in Rental',
                            expandButtonText: (this.state.sectionsVisibility[0]) ? '-' : '+',
                            projectFeatures: getEvFeaturesArray(this.state.project.included_extras),    
                        },
                        {
                            name: 'Equipment and Options',
                            expandButtonText: (this.state.sectionsVisibility[1]) ? '-' : '+',
                            projectFeatures: getEvFeaturesArray(this.state.project.equipment_and_options),    
                        },
                        {
                            name: 'Exterior',
                            expandButtonText: (this.state.sectionsVisibility[2]) ? '-' : '+',
                            projectFeatures: [
                                { 
                                    name: 'Body style',
                                    value: (this.state.project.exterior.body_style) ? 
                                    `${this.state.project.exterior.body_style}` : 
                                    'N/a',
                                },
                                { 
                                    name: 'Colour',
                                    value: this.state.project.exterior.colour,
                                },
                            ],    
                        },
                        {
                            name: 'Interior',
                            expandButtonText: (this.state.sectionsVisibility[3]) ? '-' : '+',
                            projectFeatures: [
                                { 
                                    name: 'Seating',
                                    value: this.state.project.interior.seating,
                                },
                                { 
                                    name: 'Colour',
                                    value: this.state.project.interior.colour,
                                },
                            ],    
                        },
                        {
                            name: 'Performance',
                            expandButtonText: (this.state.sectionsVisibility[4]) ? '-' : '+',
                            projectFeatures: [
                                { 
                                    name: 'Horsepower',
                                    value: `${this.state.project.model.performance.horsepower}hp`,
                                },
                                { 
                                    name: 'Top speed',
                                    value: `${this.state.project.model.performance.top_speed_mph}mph`,
                                },
                                { 
                                    name: '0-60mph',
                                    value: `${this.state.project.model.performance.zero_to_sixty_mph}sec`,
                                },
                                { 
                                    name: 'Miles per kWh',
                                    value: (this.state.project.model.performance.miles_per_kwh) ? 
                                            `${this.state.project.model.performance.miles_per_kwh}` : 
                                            'N/a',
                                },
                            ],    
                        },
                    ],
                    onChangeImageButtonClick: this.handleChangeImageButtonClick,
                    onChangeSectionsVisibility: this.handleChangeSectionsVisibility,
                },
            }             
        }
        
        return (
            <div className="project">
                <Title title={project.title} />
                <Size price={project.price} />
                <OwnerContact {...project.owner} />
                <Detail {...project.detail} />
                <OwnerContact {...project.owner} />
            </div>
        )
    }
}
