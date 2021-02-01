import React, { useEffect } from 'react';
import CallToActionButton from '../support/CallToActionButton';
import Project from './Project';
import '../../css/OwnerProject.css';

export default function OwnerProject(props) {
    const handleUpdateButtonClick = () => {
        props.history.push(`${props.match.url}/update`);
    } 

    const handleDeleteButtonClick = () => {
        let url = (process.env.NODE_ENV === 'production') 
            ? `/content${props.match.url}/delete`
            : `${process.env.REACT_APP_SERVER_URL}/content${props.match.url}/delete`;
        
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                console.log('Success:', data);
                // Go to User's Page
                props.history.push(`/user/${data.userId}/projects`);
            })            
            .catch((error) => {
                console.error('Error:', error);
                alert(`Error: ${error}`);
            });
    } 

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="owner-project">
            <div className="callToActionButton-container">
                <CallToActionButton 
                    callToActionText="Update" 
                    onButtonClick={handleUpdateButtonClick} 
                />
                <CallToActionButton
                    callToActionText="Delete" 
                    onButtonClick={handleDeleteButtonClick} 
                />
            </div>
            <Project {...props} />         
        </div>
    );
}
