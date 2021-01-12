import React, { useEffect } from 'react';
import MainHeadline from '../support/MainHeadline';
import CallToActionButton from '../support/CallToActionButton';
import EVs from './EVs';
import '../../css/OwnerEVs.css';

export default function OwnerEVs(props) {
    function handleButtonClick() {
        props.history.push(`/owner/${props.match.params.id}/ev/create`);
    }

    let url = (process.env.NODE_ENV === 'production') 
        ? `/content/${props.match.url}`
        : `${process.env.REACT_APP_SERVER_URL}/content${props.match.url}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="owner-evs">
            <MainHeadline mainHeadline="Your EVs for rent" />
            <CallToActionButton callToActionText="Add EV" onButtonClick={handleButtonClick} />
            <EVs fetchUrl={url} {...props} />         
        </div>
    );
}
