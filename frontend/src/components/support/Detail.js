import React from 'react';
import ImageSlider from './ImageSlider';
import KeyFeatures from './KeyFeatures';
import AdditionalSectionsContainer from './AdditionalSectionsContainer';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeImageButtonClick = this.handleChangeImageButtonClick.bind(this);
        this.handleChangeSectionsVisibility = this.handleChangeSectionsVisibility.bind(this);
    }

    handleChangeImageButtonClick(buttonType) {
        this.props.onChangeImageButtonClick(buttonType);
    }

    handleChangeSectionsVisibility(section) {
        this.props.onChangeSectionsVisibility(section);
    }

    render() {
        return (
            <div className="detail">
                <ImageSlider 
                    imagePath={this.props.imagePath} 
                    onChangeImageButtonClick={this.handleChangeImageButtonClick}
                />
                <KeyFeatures features={this.props.features} />
                <AdditionalSectionsContainer
                    sectionsVisibility={this.props.sectionsVisibility} 
                    sections={this.props.sections} 
                    onChangeSectionsVisibility={this.handleChangeSectionsVisibility}
                />
            </div>
        );
    }
}
