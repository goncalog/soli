import React from 'react';
import OwnerName from './OwnerName';
import OwnerRating from './OwnerRating';
import CallToActionButton from './CallToActionButton';
import { useHistory } from 'react-router-dom';

export default function Owner(props) {
    let history = useHistory();

    function handleButtonClick() {
        history.push(props.path);
    }

    return (
        <div className="owner">
            <OwnerName name={props.name} />
            <OwnerRating rating={props.rating} />
            <CallToActionButton 
                callToActionText={props.callToActionText}
                onButtonClick={handleButtonClick}
            />
        </div>
    );
}
