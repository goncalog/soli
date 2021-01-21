import React from 'react';
import Feature from './Feature';

export default function KeyFeatures(props) {
    return (
        <div className="key-features">
            {props.features.map((feature, index) => {
                return (
                    <Feature name={feature.name} value={feature.value} key={index} />
                );
            })}
        </div>
    );
}
