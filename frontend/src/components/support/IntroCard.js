import React from 'react';
import Image from './Image';
import Title from './Title';
import Size from './Size';
import KeyFeatures from './KeyFeatures';
import Grid from './Grid';
import formatNumber from '../../utils/formatNumber';
import investedIcon from '../../media/invested-icon.svg';

export default function IntroCard(props) {
    const investmentAmount = { 
        content: !props.investmentAmount 
            ? [] 
            : [
                <Image imagePath={investedIcon} />,
                <h2>{`£${formatNumber(props.investmentAmount)}`}</h2>,
                <p>invested</p>,
            ],
        };

    return (
        <div className="intro-card">
            <Image imagePath={props.imagePath} />
            <Title title={props.title} />
            <Size size={props.size} />
            <KeyFeatures features={props.features} />
            {/* Grid is empty when this component isn't part of the Dashboard component */}
            <Grid {...investmentAmount} />
        </div>
    );
}
