import React, { useEffect } from 'react';
import Image from '../support/Image';
import Grid from '../support/Grid';
import CallToActionButton from '../support/CallToActionButton';
import Projects from './Projects';
import formatNumber from '../../utils/formatNumber';
import '../../css/Dashboard.css';
import userProfilePic from '../../media/user-icon.svg';
import investedIcon from '../../media/invested-icon.svg';
import producedIcon from '../../media/electricity-icon.svg';
import co2SavedIcon from '../../media/globe-icon.svg';
import receivedIcon from '../../media/payments-icon.svg';

export default function Dashboard(props) {    
    function handleButtonClick() {
        props.history.push(`/projects`);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const userName = 'Goncalo G.';
    const userLevel = 'Level 1';
    const totalsText = ['invested', 'produced', 'CO2 saved', 'received'];
    const userTotals = {
        content: [
            [
                <Image imagePath={investedIcon} />,
                <h2>{`£${formatNumber(1000)}`}</h2>,
                <p>{totalsText[0]}</p>,
            ],        
            [
                <Image imagePath={producedIcon} />,
                <h2>{`${formatNumber(100)} kWh`}</h2>,
                <p>{totalsText[1]}</p>,
            ],
            [
                <Image imagePath={co2SavedIcon} />,
                <h2>{`${formatNumber(20)} tons`}</h2>,
                <p>{totalsText[2]}</p>,
            ],
            [
                <Image imagePath={receivedIcon} />,
                <h2>{`£${formatNumber(500)}`}</h2>,
                <p>{totalsText[3]}</p>,
            ],
        ],
    }
    const callToActionText="Invest";
    let url = (process.env.NODE_ENV === 'production') 
        // ? `/content${props.match.url}`
        // : `${process.env.REACT_APP_SERVER_URL}/content${props.match.url}`;
        ? `/content/projects`
        : `${process.env.REACT_APP_SERVER_URL}/content/projects`;

    return (
        <div className="dashboard">
            <div className="user-profile">
                <Image imagePath={userProfilePic} />
                <h1>{userName}</h1>
                <h4>{userLevel}</h4>
                <Grid {...userTotals} />
            </div>
            <CallToActionButton callToActionText={callToActionText} onButtonClick={handleButtonClick}/>
            <Projects fetchUrl={url} {...props} />
            <CallToActionButton callToActionText={callToActionText} onButtonClick={handleButtonClick}/>
        </div>
    );
}
