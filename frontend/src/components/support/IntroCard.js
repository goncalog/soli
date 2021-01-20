import React from 'react';
import Image from './Image';
import Title from './Title';
import Price from './Price';
import KeyFeatures from './KeyFeatures';

export default function IntroCard(props) {
    return (
        <div className="intro-card">
            <Image imagePath={props.imagePath} />
            <Title title={props.title} />
            <Price price={props.price} />
            <KeyFeatures features={props.features} />
        </div>
    );
}
