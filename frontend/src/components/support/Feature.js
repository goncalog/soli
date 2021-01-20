import React from 'react';
import FeatureName from './FeatureName';
import FeatureValue from './FeatureValue';

export default function Feature(props) {
    return (
        <div className='feature'>
            <FeatureName name={props.name}/>
            <FeatureValue value={props.value}/>
        </div>
    );
}
