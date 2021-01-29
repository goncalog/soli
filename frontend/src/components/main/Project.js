import React from 'react';
import Title from '../support/Title';
import Size from '../support/Size';
import Owner from '../support/Owner';
import Detail from '../support/Detail';
import formatNumber from '../../utils/formatNumber';
import getSectionArray from '../../utils/getSectionArray';
import getImagePosForSlider from '../../utils/getImagePosForSlider';
import getSize from '../../utils/getSize';
import '../../css/Project.css';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            project: {}, 
            currentImage: 0,
            sectionsVisibility: [true, false, false, false], 
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
            size: '',
            owner: { 
                name: '', 
                rating: '', 
                callToActionText: '',
                path: '', 
            },
            detail: { 
                imagePath: '', 
                features: [], 
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
                size: getSize(this.state.project),
                owner: {
                    name: this.state.project.owner.name,
                    rating: this.state.project.owner.rating,
                    callToActionText: 'Invest',
                    path: `/project/${this.state.project._id}/invest`,
                },
                detail: {
                    imagePath: imagePath,
                    features: [
                        { 
                            name: 'Status',
                            value: this.state.project.status,
                        },
                        { 
                            name: 'Est. Return',
                            value: `${this.state.project.estimated_annual_return_percent}%`,
                        },
                        { 
                            name: 'Location',
                            value: this.state.project.location.country,
                        },
                        { 
                            name: 'Est. Production',
                            value: `${formatNumber(this.state.project.estimated_annual_production_kwh)} kWh/year`,
                        },
                        { 
                            name: 'CO2 Saved',
                            value: `${formatNumber(this.state.project.estimated_total_co2_saved_ton)} tons`,
                        },
                        { 
                            name: 'Risk',
                            value: this.state.project.risk_level,
                        },
                        { 
                            name: '',
                            value: '',
                        },
                        { 
                            name: 'Payment',
                            value: this.state.project.payment_schedule,
                        },
                    ],
                    sectionsVisibility: this.state.sectionsVisibility,
                    sections: [
                        {
                            name: 'Production',
                            expandButtonText: (this.state.sectionsVisibility[0]) ? '-' : '+',
                            features: getSectionArray(this.state.project.real_annual_production_kwh, 
                                this.state.project.year_start_production, 'kWh'),    
                        },
                        {
                            name: 'Payments',
                            expandButtonText: (this.state.sectionsVisibility[1]) ? '-' : '+',
                            features: getSectionArray(this.state.project.real_annual_payments, 
                                this.state.project.year_start_production, 
                                this.state.project.payments_currency),    
                        },
                        {
                            name: 'Annual Return',
                            expandButtonText: (this.state.sectionsVisibility[2]) ? '-' : '+',
                            features: getSectionArray(this.state.project.real_annual_return_percent, 
                                this.state.project.year_start_production, '%'),    
                        },
                        {
                            name: 'CO2 Saved',
                            expandButtonText: (this.state.sectionsVisibility[3]) ? '-' : '+',
                            features: getSectionArray(this.state.project.real_annual_co2_saved_ton, 
                                this.state.project.year_start_production, 'tons'), 
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
                <Size size={project.size} />
                <Owner {...project.owner} />
                <Detail {...project.detail} />
                <Owner {...project.owner} />
            </div>
        )
    }
}
