import React from 'react';
import MainHeadline from '../support/MainHeadline';
import Input from '../support/Input';
import Select from '../support/Select';
import CallToActionButton from '../support/CallToActionButton';
import sortString from '../../utils/sortString';
import removeDuplicates from '../../utils/removeDuplicates';
import '../../css/Form.css';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            size: '',
            totalCost: '',
            totalCostCurrency: '',
            status: '',
            estimatedAnnualReturn: '',
            location: '',
            imageUrl: '',
            imageUrls: [],
            estimatedTotalCo2Saved: '',
            estimatedAnnualProduction: '',
            paymentSchedule: '',
            riskLevel: '',
            yearStartProduction: '',
            realAnnualProduction: '',
            realAnnualProductions: [],
            realAnnualPayment: '',
            realAnnualPayments: [],
            paymentsCurrency: '',
            realAnnualReturn: '',
            realAnnualReturns: [],
            realAnnualCo2Saving: '',
            realAnnualCo2Savings: [],
            locations: [],
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddImageUrlButtonClick = this.handleAddImageUrlButtonClick.bind(this);
        this.handleAddRealAnnualProductionsButtonClick = this.handleAddRealAnnualProductionsButtonClick.bind(this);
        this.handleAddRealAnnualPaymentsButtonClick = this.handleAddRealAnnualPaymentsButtonClick.bind(this);
        this.handleAddRealAnnualReturnsButtonClick = this.handleAddRealAnnualReturnsButtonClick.bind(this);
        this.handleAddRealAnnualCo2SavingsButtonClick = this.handleAddRealAnnualCo2SavingsButtonClick.bind(this);
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    }
    
    handleTextChange(property, value) {
        this.setState({ [property]: value });
    }

    handleAddImageUrlButtonClick() {
        if (this.state.imageUrl === '') {
            alert('Please provide a valid image url.');
            return;
        }

        this.setState((state) => {
            let array = state.imageUrls.slice(); // Creating a new copy
            array.push(state.imageUrl);
            return { imageUrls: array, imageUrl: '' };
        });
    }

    handleAddRealAnnualProductionsButtonClick() {
        if (this.state.realAnnualProduction === '') {
            alert('Please provide a valid input.');
            return;
        }

        this.setState((state) => {
            let array = state.realAnnualProductions.slice(); // Creating a new copy
            array.push(state.realAnnualProduction);
            return { realAnnualProductions: array, realAnnualProduction: '' };
        });
    }

    handleAddRealAnnualPaymentsButtonClick() {
        if (this.state.realAnnualPayment === '') {
            alert('Please provide a valid input.');
            return;
        }

        this.setState((state) => {
            let array = state.realAnnualPayments.slice(); // Creating a new copy
            array.push(state.realAnnualPayment);
            return { realAnnualPayments: array, realAnnualPayment: '' };
        });
    }

    handleAddRealAnnualReturnsButtonClick() {
        if (this.state.realAnnualReturn === '') {
            alert('Please provide a valid input.');
            return;
        }

        this.setState((state) => {
            let array = state.realAnnualReturns.slice(); // Creating a new copy
            array.push(state.realAnnualReturn);
            return { realAnnualReturns: array, realAnnualReturn: '' };
        });
    }

    handleAddRealAnnualCo2SavingsButtonClick() {
        if (this.state.realAnnualCo2Saving === '') {
            alert('Please provide a valid input.');
            return;
        }

        this.setState((state) => {
            let array = state.realAnnualCo2Savings.slice(); // Creating a new copy
            array.push(state.realAnnualCo2Saving);
            return { realAnnualCo2Savings: array, realAnnualCo2Saving: '' };
        });
    }

    handleSaveButtonClick() {
        // Validation
        if (this.state.name === '') {
            alert('Please provide a valid name.');
            return;
        }

        if (this.state.size < 0 || this.state.size === '' || isNaN(Number(this.state.size))) {
            alert('Please provide a valid size.');
            return;
        }

        if (this.state.totalCost < 0 || this.state.totalCost === '' || isNaN(Number(this.state.totalCost))) {
            alert('Please provide a valid total cost.');
            return;
        }

        if (this.state.totalCostCurrency === '') {
            alert('Please provide a valid total cost currency.');
            return;
        }

        if (this.state.status === '') {
            alert('Please provide a valid status.');
            return;
        }

        if (this.state.estimatedAnnualReturn < 0 || this.state.estimatedAnnualReturn === '' || isNaN(Number(this.state.estimatedAnnualReturn))) {
            alert('Please provide a valid estimated annual return.');
            return;
        }

        if (this.state.location === '') {
            alert('Please provide a valid location.');
            return;
        }

        if (this.state.imageUrls === []) {
            alert('Please add some images.');
            return;
        }

        if (this.state.estimatedTotalCo2Saved < 0 || this.state.estimatedTotalCo2Saved === '' || isNaN(Number(this.state.estimatedTotalCo2Saved))) {
            alert('Please provide a valid estimated total CO2 saved.');
            return;
        }

        if (this.state.estimatedAnnualProduction < 0 || this.state.estimatedAnnualProduction === '' || isNaN(Number(this.state.estimatedAnnualProduction))) {
            alert('Please provide a valid estimated annual production.');
            return;
        }

        if (this.state.paymentSchedule === '') {
            alert('Please provide a valid payment schedule.');
            return;
        }

        if (this.state.riskLevel === '') {
            alert('Please provide a valid risk level.');
            return;
        }

        if (this.state.yearStartProduction < 2000 || this.state.yearStartProduction > new Date().getFullYear 
                || this.state.yearStartProduction === '' || isNaN(Number(this.state.yearStartProduction))) {
            alert('Please provide a valid year of production start.');
            return;
        }

        if (this.state.paymentsCurrency === '') {
            alert('Please provide a valid payments currency.');
            return;
        }

        // Send data to backend
        let url = (process.env.NODE_ENV === 'production') 
            ? `/content${this.props.match.url}`
            : `${process.env.REACT_APP_SERVER_URL}/content${this.props.match.url}`;
        
        let data = {
            name: this.state.name,
            size: this.state.size,
            totalCost: this.state.totalCost,
            totalCostCurrency: this.state.totalCostCurrency,
            status: this.state.status,
            estimatedAnnualReturn: this.state.estimatedAnnualReturn,
            location: this.state.location,
            // Not sending the owner because the backend (Passport) already has this info
            imageUrls: this.state.imageUrls,
            estimatedTotalCo2Saved: this.state.estimatedTotalCo2Saved,
            estimatedAnnualProduction: this.state.estimatedAnnualProduction,
            paymentSchedule: this.state.paymentSchedule,
            riskLevel: this.state.riskLevel,
            yearStartProduction: this.state.yearStartProduction,
            realAnnualProductions: this.state.realAnnualProductions,
            realAnnualPayments: this.state.realAnnualPayments,          
            paymentsCurrency: this.state.paymentsCurrency,          
            realAnnualReturns: this.state.realAnnualReturns,          
            realAnnualCo2Savings: this.state.realAnnualCo2Savings,          
        };

        fetch(url, {
            method: this.props.match.url.slice(-6) === 'update' ? 'PUT' : 'POST',
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
                // Go to Owner Page
                this.props.history.push(`/owner/${data.userId}/projects`);
            })            
            .catch((error) => {
                console.error('Error:', error);
                alert(`Error: ${error}`);
            });        
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        // Fetch locations
        if (this.state.locations.length === 0) {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content/locations` 
                    : `${process.env.REACT_APP_SERVER_URL}/content/locations`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => { this.setState({ locations: removeDuplicates(sortString(res.locations, 'city'), 'city') }) })
        }

        // If this is the update page, load Project data
        if (this.props.match.url.slice(-6) === 'update') {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content${this.props.match.url}` 
                    : `${process.env.REACT_APP_SERVER_URL}/content${this.props.match.url}`;

            fetch(url, { credentials: 'include' })
                .then((res) => res.json())
                .then((res) => res.project)
                .then((res) => {
                    this.setState({
                        name: res.name,
                        size: res.size_kw,
                        totalCost: res.total_cost,
                        totalCostCurrency: res.total_cost_currency,
                        status: res.status,
                        estimatedAnnualReturn: res.estimated_annual_return_percent,
                        location: res.location._id,
                        // Not sending the owner because the backend (Passport) already has this info
                        imageUrls: res.image_urls,
                        estimatedTotalCo2Saved: res.estimated_total_co2_saved_ton,
                        estimatedAnnualProduction: res.estimated_annual_production_kwh,
                        paymentSchedule: res.payment_schedule,
                        riskLevel: res.risk_level,
                        yearStartProduction: res.year_start_production,
                        realAnnualProductions: res.real_annual_production_kwh,
                        realAnnualPayments: res.real_annual_payments,          
                        paymentsCurrency: res.payments_currency,          
                        realAnnualReturns: res.real_annual_return_percent,          
                        realAnnualCo2Savings: res.real_annual_co2_saved_ton,                        
                    }); 
                });
        }
    }

    render() {
        return (
            <div className="form">
                <MainHeadline mainHeadline="Your Project" />
                <CallToActionButton 
                    callToActionText="Save" 
                    onButtonClick={this.handleSaveButtonClick}
                />

                <Input 
                    className="name"
                    property="name"
                    placeholder="Name" 
                    text={this.state.name}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="size"
                    property="size"
                    placeholder="Size in kW" 
                    text={this.state.size}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="total-cost"
                    property="totalCost"
                    placeholder="Total cost" 
                    text={this.state.totalCost}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="total-cost-currency"
                    property="totalCostCurrency"
                    placeholder="Total cost currency" 
                    text={this.state.totalCostCurrency}
                    onTextChange={this.handleTextChange}
                />
                <Select 
                    className="status"
                    property="status"
                    placeholder="Status" 
                    onTextChange={this.handleTextChange}
                    option={this.state.status}
                    // _id is what is saved to the db
                    options={[{ name: 'Planning', _id: 'Planning' }, { name: 'Funding', _id: 'Funding' },
                            { name: 'Installing', _id: 'Installing' }, { name: 'Producing', _id: 'Producing' }]}
                />
                <Input 
                    className="estimated-annual-return"
                    property="estimatedAnnualReturn"
                    placeholder="Estimated annual return" 
                    text={this.state.estimatedAnnualReturn}
                    onTextChange={this.handleTextChange}
                />
                <Select
                    className="location"
                    property="location"
                    placeholder="Location"
                    onTextChange={this.handleTextChange}
                    option={this.state.location} 
                    options={this.state.locations}
                />
                
                <div className="image-urls-container add">
                    <Input 
                        className="image-url"
                        property="imageUrl"
                        placeholder="Image URL" 
                        text={this.state.imageUrl}
                        onTextChange={this.handleTextChange}
                    />
                    <CallToActionButton  
                        callToActionText="Add" 
                        onButtonClick={this.handleAddImageUrlButtonClick}
                    />
                   <p className="image-urls">
                        {`${this.state.imageUrls.length} ${this.state.imageUrls.length === 1 
                                ? 'image' : 'images'} added`}
                    </p>
                </div>

                <Input 
                    className="estimated-total-co2-saved"
                    property="estimatedTotalCo2Saved"
                    placeholder="Estimated total CO2 saved" 
                    text={this.state.estimatedTotalCo2Saved}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="estimated-annual_production"
                    property="estimatedAnnualProduction"
                    placeholder="Estimated annual production in kWh"
                    text={this.state.estimatedAnnualProduction}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="payment-schedule"
                    property="paymentSchedule"
                    placeholder="Payment schedule" 
                    text={this.state.paymentSchedule}
                    onTextChange={this.handleTextChange}
                />
                <Select 
                    className="risk-level"
                    property="riskLevel"
                    placeholder="Risk level" 
                    onTextChange={this.handleTextChange}
                    option={this.state.riskLevel}
                    // _id is what is saved to the db
                    options={[{ name: 'Very Low', _id: 'Very Low' }, { name: 'Low', _id: 'Low' },
                            { name: 'Medium', _id: 'Medium' }, { name: 'High', _id: 'High' }, 
                            { name: 'Very High', _id: 'Very High' }]}

                />
                <Input 
                    className="year-start-production"
                    property="yearStartProduction"
                    placeholder="Year of production start" 
                    text={this.state.yearStartProduction}
                    onTextChange={this.handleTextChange}
                />

                <div className="real-annual-productions-container add">
                    <Input 
                        className="real-annual-production"
                        property="realAnnualProduction"
                        placeholder="Real annual production in kWh" 
                        text={this.state.realAnnualProduction}
                        onTextChange={this.handleTextChange}
                    />
                    <CallToActionButton  
                        callToActionText="Add" 
                        onButtonClick={this.handleAddRealAnnualProductionsButtonClick}
                    />
                   <p className="real-annual-productions">
                        {`${this.state.realAnnualProductions.length} ${this.state.realAnnualProductions.length === 1 
                                ? 'year' : 'years'} added`}
                    </p>
                </div>

                <div className="real-annual-payments-container add">
                    <Input 
                        className="real-annual-payment"
                        property="realAnnualPayment"
                        placeholder="Real annual payment" 
                        text={this.state.realAnnualPayment}
                        onTextChange={this.handleTextChange}
                    />
                    <CallToActionButton  
                        callToActionText="Add" 
                        onButtonClick={this.handleAddRealAnnualPaymentsButtonClick}
                    />
                   <p className="real-annual-payments">
                        {`${this.state.realAnnualPayments.length} ${this.state.realAnnualPayments.length === 1 
                                ? 'year' : 'years'} added`}
                    </p>
                </div>
                
                <Input 
                    className="payments-currency"
                    property="paymentsCurrency"
                    placeholder="Payments currency" 
                    text={this.state.paymentsCurrency}
                    onTextChange={this.handleTextChange}
                />

                <div className="real-annual-returns-container add">
                    <Input 
                        className="real-annual-return"
                        property="realAnnualReturn"
                        placeholder="Real annual return" 
                        text={this.state.realAnnualReturn}
                        onTextChange={this.handleTextChange}
                    />
                    <CallToActionButton  
                        callToActionText="Add" 
                        onButtonClick={this.handleAddRealAnnualReturnsButtonClick}
                    />
                   <p className="real-annual-returns">
                        {`${this.state.realAnnualReturns.length} ${this.state.realAnnualReturns.length === 1 
                                ? 'year' : 'years'} added`}
                    </p>
                </div>
                <div className="real-annual-co2-savings-container add">
                    <Input 
                        className="real-annual-co2-saving"
                        property="realAnnualCo2Saving"
                        placeholder="Real annual co2 saved in tons" 
                        text={this.state.realAnnualCo2Saving}
                        onTextChange={this.handleTextChange}
                    />
                    <CallToActionButton  
                        callToActionText="Add" 
                        onButtonClick={this.handleAddRealAnnualCo2SavingsButtonClick}
                    />
                   <p className="real-annual-co2-savings">
                        {`${this.state.realAnnualCo2Savings.length} ${this.state.realAnnualCo2Savings.length === 1 
                                ? 'year' : 'years'} added`}
                    </p>
                </div>

                <CallToActionButton 
                    callToActionText="Save" 
                    onButtonClick={this.handleSaveButtonClick}
                />
            </div>
        );
    }
}
