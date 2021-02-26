import React from 'react';
import HeadlineContainer from '../support/HeadlineContainer';
import BenefitsContainer from '../support/BenefitsContainer';
import OwnerContainer from '../support/OwnerContainer';
import MainHeadline from '../support/MainHeadline';
import SecondaryHeadline from '../support/SecondaryHeadline';
import CallToActionButton from '../support/CallToActionButton';
import Grid from '../support/Grid';
import OrderedList from '../support/OrderedList';
import Image from '../support/Image';
import backgroundHeadlineContainer from '../../media/headline-background.jpg';
import backgroundOwnerContainer from '../../media/owner-container-background.jpg';
import roofIcon from '../../media/house-icon.svg';
import solarPanelIcon from '../../media/solar-panel-icon.svg';
import savingsIcon from '../../media/payments-icon.svg';
import returnsIcon from '../../media/invested-icon.svg';
import convenienceIcon from '../../media/beach-icon.svg';
import oneIcon from '../../media/one-icon.svg';
import twoIcon from '../../media/two-icon.svg';
import threeIcon from '../../media/three-icon.svg';
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
    const electricityDiscount = '10-30%';
    const solarPanelsReturn = '5-16%';

    const headlineProps = {
        backgroundImagePath: backgroundHeadlineContainer,
        mainHeadline: 'Make money from solar panels',
        secondaryHeadline: 'And offset your carbon footprint',
        callToActionText: driverCallToActionText,
        onButtonClick: handleButtonClick,
    }

    const icons = [oneIcon, twoIcon, threeIcon];
    const howitworksProps = {
        content: [
            [
                <Image imagePath={solarPanelIcon} />,
                <MainHeadline mainHeadline="Solar Investors" />,
                <OrderedList listItems={
                    [
                        'Choose a solar panel installation project to fund from our carefully selected list - including schools, hospitals, office buildings and factories',
                        'Invest from £5',
                        `Earn a ${solarPanelsReturn} annual return while offsetting your carbon footprint - you'll get paid for the solar energy produced`,
                    ]}
                    icons={icons}
                />,
            ],
            [
                <Image imagePath={roofIcon} />,
                <MainHeadline mainHeadline="Solar Projects" />,
                <OrderedList listItems={
                    [
                        'List your solar panel installation project',
                        'Get your project fully funded by solar investors',
                        `Get a ${electricityDiscount} discount vs. your current energy provider by using the electricity produced by the solar panels`,
                    ]}
                    icons={icons}
                />,
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
