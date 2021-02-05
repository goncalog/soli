import React, { useEffect, useState } from 'react';
import Image from '../support/Image';
import Grid from '../support/Grid';
import CallToActionButton from '../support/CallToActionButton';
import ProjectsContainer from '../support/ProjectsContainer';
import getTotals from '../../utils/getTotals';
import getProjects from '../../utils/getProjects';
import '../../css/Dashboard.css';
import userProfilePic from '../../media/user-icon.svg';
import investedIcon from '../../media/invested-icon.svg';
import producedIcon from '../../media/electricity-icon.svg';
import co2SavedIcon from '../../media/globe-icon.svg';
import receivedIcon from '../../media/payments-icon.svg';

export default function Dashboard(props) {
    const [userName, setUserName] = useState(' ');
    const [userTotals, setUserTotals] = useState([0, 0, 0, 0]);
    const [projects, setProjects] = useState([]);

    function handleButtonClick() {
        props.history.push(`/projects`);
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        // GET User data from db
        let userUrl = (process.env.NODE_ENV === 'production') 
                ? `/content/user/${props.match.params.id}`
                : `${process.env.REACT_APP_SERVER_URL}/content/user/${props.match.params.id}`;

        fetch(userUrl, { credentials: 'include' })
            .then((res) => res.json())
            .then((res) => {
                setUserName(res.user.name);
                setProjects(getProjects(res.projects));
                // Assumes all investments are in £
                setUserTotals(getTotals(res.user.investments, res.projects));
            });
    }, []); // If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run. This isn’t handled as a special case — it follows directly from how the dependencies array always works.

    const userLevel = 'Level 1';
    const totalsText = ['invested', 'produced', 'CO2 saved', 'received'];
    const userTotalsGrid = {
        content: [
            [
                <Image imagePath={investedIcon} />,
                <h2>{`£${userTotals[0]}`}</h2>,
                <p>{totalsText[0]}</p>,
            ],        
            [
                <Image imagePath={producedIcon} />,
                <h2>{`${userTotals[1]}`}<span className="units"> kWh</span></h2>,
                <p>{totalsText[1]}</p>,
            ],
            [
                <Image imagePath={co2SavedIcon} />,
                <h2>{`${userTotals[2]}`}<span className="units"> tons</span></h2>,
                <p>{totalsText[2]}</p>,
            ],
            [
                <Image imagePath={receivedIcon} />,
                <h2>{`£${userTotals[3]}`}</h2>,
                <p>{totalsText[3]}</p>,
            ],
        ],
    }
    const callToActionText="Invest";

    return (
        <div className="dashboard">
            <div className="user-profile">
                <Image imagePath={userProfilePic} />
                <h1>{userName}</h1>
                <h4>{userLevel}</h4>
                <Grid {...userTotalsGrid} />
            </div>
            <CallToActionButton callToActionText={callToActionText} onButtonClick={handleButtonClick}/>
            <ProjectsContainer projects={projects} {...props} />
            {projects.length !== 0 && ( 
                <CallToActionButton callToActionText={callToActionText} onButtonClick={handleButtonClick}/>
            )}
        </div>
    );
}
