import React, { useEffect, useState } from 'react';
import Title from '../support/Title';
import Size from '../support/Size';
import KeyFeatures from '../support/KeyFeatures';
import MainHeadline from '../support/MainHeadline';
import SecondaryHeadline from '../support/SecondaryHeadline';
import Input from '../support/Input';
import CallToActionButton from '../support/CallToActionButton';
import getSize from '../../utils/getSize';
import formatNumber from '../../utils/formatNumber';
import '../../css/Invest.css';

export default function Invest(props) {
    const [title, setTitle] = useState('');
    const [size, setSize] = useState('');
    const [totalInvestment, setTotalInvestment] = useState('');
    const [investmentAmount, setInvestmentAmount] = useState(props.history.location.state 
            ? props.history.location.state.investmentAmount
            : ''
    );
    const [features, setFeatures] = useState([]);
    const [currency, setCurrency] = useState('');
    const [hasInvested, setHasInvested] = useState(false);
    
    function handleTextChange(prop, value) {
        if (prop === 'investmentAmount') setInvestmentAmount(value.substring(1));
    }

    function handleInvestButtonClick() {
        if (investmentAmount < 0 || investmentAmount === '' || isNaN(Number(investmentAmount)) 
                || investmentAmount > totalInvestment) {
            alert('Please provide a valid amount.');

        } else if (props.loggedIn) {
            // Send data to backend
            let url = (process.env.NODE_ENV === 'production') 
            ? `/content/user/${props.userId}${props.match.url}`
            : `${process.env.REACT_APP_SERVER_URL}/content/user/${props.userId}${props.match.url}`;
        
            let data = {
                investmentAmount: investmentAmount,
                // Not sending the user because the backend (Passport) already has this info      
            };

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            })
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }

                    console.log('Success:', data);
                    setHasInvested(true);
                })            
                .catch((error) => {
                    console.error('Error:', error);
                    alert(`Error: ${error}`);
                });

        } else {
            props.history.push({
                pathname: `/user/signup`,
                state: { 
                    projectId: props.match.params.id,
                    investmentAmount: investmentAmount,
                }, 
            });
        }
    }

    function handleDashboardButtonClick() {
        props.history.push(`/user/${props.userId}`);
    }

    useEffect(() => {
        // Scroll to top of page
        window.scrollTo(0, 0);

        // Upload database data
        let projectUrl = (process.env.NODE_ENV === 'production')
                ? `/content/project/${props.match.params.id}`
                : `${process.env.REACT_APP_SERVER_URL}/content/project/${props.match.params.id}`;

        fetch(projectUrl)
            .then((res) => res.json())
            .then((res) => { 
                setTitle(res.project.name); 
                setSize(getSize(res.project));
                setTotalInvestment(res.project.total_cost);
                setFeatures([
                    { 
                        name: 'Status',
                        value: res.project.status,
                    },
                    { 
                        name: 'Est. Return',
                        value: `${res.project.estimated_annual_return_percent}%`,
                    },
                    { 
                        name: 'Location',
                        value: res.project.location.country,
                    },
                ]);
                setCurrency(res.project.total_cost_currency);
            })
    }, [props.match.params.id]);

    return (
        <div className="invest">
            <Title title={title}/>
            <Size size={size}/>
            <KeyFeatures features={features}/>
            
            <div className="transaction">
                <div className={hasInvested ? "amount hidden" : "amount"}>
                    <MainHeadline mainHeadline="Investment amount" />
                    <Input 
                        className="investment-amount"
                        property="investmentAmount"
                        placeholder="" 
                        text={`${currency}${investmentAmount}`}
                        onTextChange={handleTextChange}
                    />    
                    <CallToActionButton callToActionText="Invest" onButtonClick={handleInvestButtonClick}/>
                </div>

                <div className={hasInvested ? "congrats" : "congrats hidden"}>
                    <SecondaryHeadline secondaryHeadline={`Congratulations, you've just invested ${currency}${formatNumber(investmentAmount)} in ${title}!`} />
                    <CallToActionButton callToActionText="Go to Dashboard" onButtonClick={handleDashboardButtonClick}/>
                </div>                
            </div>
        </div>
    )
}
