import React from 'react';
import AdditionalSectionName from './AdditionalSectionName';
import ExpandButton from './ExpandButton';
import AdditionalFeatures from './AdditionalFeatures';

export default class AdditionalSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSectionVisibility = this.handleChangeSectionVisibility.bind(this);
    }

    handleChangeSectionVisibility(section) {
        this.props.onChangeSectionVisibility(section);
    }

    render() {
        return (
            <div className="additional-section">
                <AdditionalSectionName name={this.props.name} />
                <ExpandButton
                    section={this.props.section} 
                    expandButtonText={this.props.expandButtonText} 
                    onChangeSectionVisibility={this.handleChangeSectionVisibility}    
                />
                <AdditionalFeatures 
                    features={this.props.features} 
                    sectionVisibility={this.props.sectionVisibility}
                />
            </div>
        );
    }
}
