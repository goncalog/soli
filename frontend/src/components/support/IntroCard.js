import React from 'react';
import Image from './Image';
import Title from './Title';
import Size from './Size';
import KeyFeatures from './KeyFeatures';

export default function IntroCard(props) {
    return (
        <div className="intro-card">
            <Image imagePath={props.imagePath} />
            <Title title={props.title} />
            <Size size={props.size} />
            <KeyFeatures features={props.features} />
        </div>
    );
}
