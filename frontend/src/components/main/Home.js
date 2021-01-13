import React from 'react';
import HeadlineContainer from '../support/HeadlineContainer';
import BenefitsContainer from '../support/BenefitsContainer';
import OwnerContainer from '../support/OwnerContainer';
import MainHeadline from '../support/MainHeadline';
import CallToActionButton from '../support/CallToActionButton';
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
    const electricityDiscount = '10-25%';
    const solarPanelsReturn = '5-10%';

    const headlineProps = {
        backgroundImagePath: backgroundHeadlineContainer,
        mainHeadline: 'Make money from solar panels',
        secondaryHeadline: 'Whether you own a roof or not',
        callToActionText: driverCallToActionText,
        onButtonClick: onEvsButtonClick,
    }

    const howitworksProps = [
        {
            mainHeadline: 'Roof owners',
            listItems: [
                'List your roof on Soli',
                'Find people interested in paying for solar panels to be installed on your roof',
                `Use the electricity produced by the solar panels at a ${electricityDiscount} discount vs. your current provider`,
            ],
            secondaryHeadline: 'Ideal for roof owners who\'d like to benefit from cheaper and more sustainable electricity but don\'t want to make the full upfront investment in solar panels',
        },
        
        {
            mainHeadline: 'Solar panel owners',
            listItems: [
                'Find a roof where you can install solar panels',
                'Buy the solar panels - we\'ll install them for you',
                `Start earning a ${solarPanelsReturn} annual return on your solar panels - you\'ll be paid by the roof owner for the electricity produced`,
            ],
            secondaryHeadline: 'Perfect for those that don\'t own a roof but still want to buy solar panels in order to produce electricity and get a better return from their savings',
        },
    ]

    const benefitsProps = {
        benefits: [
            { 
                title: 'Huge Savings',
                text: `Get a ${electricityDiscount} discount on your electricity price`,
            },
            { 
                title: 'Great Returns',
                text: `Earn a ${solarPanelsReturn} annual return on solar panels`,
            },
            { 
                title: 'Max Convenience',
                text: 'We take care of everything - just enjoy and relax while you profit from the energy produced',
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
            <div className="howitworks-container">
                <MainHeadline mainHeadline="How it works" />
                {/* <Grid {...howitworksProps} /> */}
                <CallToActionButton callToActionText={driverCallToActionText} onButtonClick={onEvsButtonClick}/>
            </div>
            <BenefitsContainer {...benefitsProps} />
            <OwnerContainer {...ownerProps} />
        </div>
    );
}
