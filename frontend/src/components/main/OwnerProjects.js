import React, { useEffect } from 'react';
import MainHeadline from '../support/MainHeadline';
import CallToActionButton from '../support/CallToActionButton';
import Projects from './Projects';
import '../../css/OwnerProjects.css';

export default function OwnerProjects(props) {
    function handleButtonClick() {
        props.history.push(`/user/${props.match.params.id}/project/create`);
    }

    let url = (process.env.NODE_ENV === 'production') 
        ? `/content${props.match.url}`
        : `${process.env.REACT_APP_SERVER_URL}/content${props.match.url}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="owner-projects">
            <MainHeadline mainHeadline="Your Projects" />
            <CallToActionButton callToActionText="Add Project" onButtonClick={handleButtonClick} />
            <Projects fetchUrl={url} {...props} />   
        </div>
    );
}
