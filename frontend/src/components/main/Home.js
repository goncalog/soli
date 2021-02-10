import React from 'react';
import HeadlineContainer from '../support/HeadlineContainer';
import BenefitsContainer from '../support/BenefitsContainer';
import OwnerContainer from '../support/OwnerContainer';
import MainHeadline from '../support/MainHeadline';
import SecondaryHeadline from '../support/SecondaryHeadline';
import CallToActionButton from '../support/CallToActionButton';
import Grid from '../support/Grid';
import OrderedList from '../support/OrderedList';
import backgroundHeadlineContainer from '../../media/headline-background.jpg';
import backgroundOwnerContainer from '../../media/owner-container-background.jpg';
import savingsIcon from '../../media/payments-icon.svg';
import returnsIcon from '../../media/invested-icon.svg';
import convenienceIcon from '../../media/beach-icon.svg';
import '../../css/Home.css';
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    let history = useHistory();

    function handleButtonClick() {
        history.push('/projects');
    }

    function onSellButtonClick() {
        (props.loggedIn) ? history.push(`/user/${props.userId}/projects`) : history.push('/user/signup');
    }
    
    const driverCallToActionText = 'Let\'s EARN!';
    const electricityDiscount = '10-25%';
    const solarPanelsReturn = '5-10%';

    const headlineProps = {
        backgroundImagePath: backgroundHeadlineContainer,
        mainHeadline: 'Make money from solar panels',
        secondaryHeadline: 'Whether you own a roof or not',
        callToActionText: driverCallToActionText,
        onButtonClick: handleButtonClick,
    }

    const howitworksProps = {
        content: [
            [
                <MainHeadline mainHeadline="Roof Owners" />,
                <OrderedList listItems={
                    [
                        'List your roof',
                        'Find people interested in buying solar panels to be installed on your roof',
                        `Use the electricity produced by the solar panels at a ${electricityDiscount} discount vs. your current provider`,
                    ]}  
                />,
                <SecondaryHeadline secondaryHeadline="Ideal for roof owners who&#39;d like to benefit from cheaper and more sustainable electricity but don&#39;t want to make the full upfront investment in solar panels" />,
            ],        
            [
                <MainHeadline mainHeadline="Solar Panel Owners" />,
                <OrderedList listItems={
                    [
                        'Find a roof where you can install solar panels',
                        'Buy the solar panels - we\'ll install them for you',
                        `Start earning a ${solarPanelsReturn} annual return on your solar panels - you'll be paid by the roof owner for the electricity produced`,
                    ]}  
                />,
                <SecondaryHeadline secondaryHeadline="Perfect for those who don&#39;t own a roof but still want to buy solar panels in order to produce electricity and get a better return from their savings" />,
            ],
        ],
    }

    const benefitsProps = {
        benefits: [
            { 
                imagePath: savingsIcon,
                title: 'Huge Savings',
                text: `Get a ${electricityDiscount} discount on your electricity price`,
            },
            { 
                imagePath: returnsIcon,
                title: 'Great Returns',
                text: `Earn a ${solarPanelsReturn} annual return on solar panels`,
            },
            { 
                imagePath: convenienceIcon,
                title: 'Max Convenience',
                text: 'We take care of everything - just enjoy and relax while you profit from the energy produced',
            },
        ],
        callToActionText: driverCallToActionText,
        onButtonClick: handleButtonClick,
    }

    const ownerProps = {
        backgroundImagePath: backgroundOwnerContainer,
        mainHeadline: 'Monetise your roof',
        secondaryHeadline: 'Find solar panel owners interested in using your roof to produce energy',
        callToActionText: 'Let\'s EARN!',
        onButtonClick: onSellButtonClick,
    }

    return (
        <div className="home">
            <HeadlineContainer {...headlineProps}/>
            <div className="howitworks-container">
                <MainHeadline mainHeadline="How it works" />
                <Grid {...howitworksProps} />
                <CallToActionButton callToActionText={driverCallToActionText} onButtonClick={handleButtonClick}/>
            </div>
            <BenefitsContainer {...benefitsProps} />
            <OwnerContainer {...ownerProps} />
        </div>
    );
}
