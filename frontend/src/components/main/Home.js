import React from 'react';
import HeadlineContainer from '../support/HeadlineContainer';
import BenefitsContainer from '../support/BenefitsContainer';
import OwnerContainer from '../support/OwnerContainer';
import backgroundHeadlineContainer from '../../media/headline-background.jpg';
import backgroundOwnerContainer from '../../media/owner-container-background.jpg';
import '../../css/Home.css';
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    let history = useHistory();

    function onEvsButtonClick() {
        history.push('/evs');
    }

    function onSellButtonClick() {
        (props.loggedIn) ? history.push(`/owner/${props.userId}/evs`) : history.push('/owner/signup');
    }
    
    const driverCallToActionText = 'Let\'s JOIN!';
    const headlineProps = {
        backgroundImagePath: backgroundHeadlineContainer,
        mainHeadline: 'Make money from solar panels',
        secondaryHeadline: 'Whether you own a roof or not',
        callToActionText: driverCallToActionText,
        onButtonClick: onEvsButtonClick,
    }

    const benefitsProps = {
        benefits: [
            { 
                title: 'Huge Savings',
                text: 'Get a 10-25% discount on your electricity price',
            },
            { 
                title: 'Great Returns',
                text: 'Earn a 5-10% return on solar panels',
            },
            { 
                title: 'Max Convenience',
                text: 'We take care of everything - just enjoy and relax while you earn from the energy produced',
            },
        ],
        callToActionText: driverCallToActionText,
        onButtonClick: onEvsButtonClick,
    }

    const ownerProps = {
        backgroundImagePath: backgroundOwnerContainer,
        mainHeadline: 'Rent your roof',
        secondaryHeadline: 'Find solar panel owners interested in renting your roof to produce energy',
        callToActionText: 'Let\'s JOIN!',
        onButtonClick: onSellButtonClick,
    }

    return (
        <div className="home">
            <HeadlineContainer {...headlineProps}/>
            <BenefitsContainer {...benefitsProps} />
            <OwnerContainer {...ownerProps} />
        </div>
    );
}
