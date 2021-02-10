import React from 'react';
import Image from './Image';

export default class Benefit extends React.Component {
    render() {
        return (
            <div className="benefit">
                <Image imagePath={this.props.imagePath} />
                <h5 className="benefit-title">{this.props.benefitTitle}</h5>
                <p className="benefit-text">{this.props.benefitText}</p>
            </div>
        );
    }
}
