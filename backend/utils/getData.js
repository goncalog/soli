const getData = (obj) => {
    return { 
        name: obj.body.name,
        size_kw: obj.body.size,
        total_cost: obj.body.totalCost,
        total_cost_currency: obj.body.totalCostCurrency,
        status: obj.body.status,    
        estimated_annual_return_percent: obj.body.estimatedAnnualReturn,
        location: obj.body.location,
        image_urls: obj.body.imageUrls,
        owner: obj.user, // The owner is the logged in user via Passport
        estimated_total_co2_saved_ton: obj.body.estimatedTotalCo2Saved,
        estimated_annual_production_kwh: obj.body.estimatedAnnualProduction,
        payment_schedule: obj.body.paymentSchedule,
        risk_level: obj.body.riskLevel,
        year_start_production: obj.body.yearStartProduction,  
        real_annual_production_kwh: obj.body.realAnnualProductions,    
        real_annual_payments: obj.body.realAnnualPayments,
        payments_currency: obj.body.paymentsCurrency,
        real_annual_return_percent: obj.body.realAnnualReturns,    
        real_annual_co2_saved_ton: obj.body.realAnnualCo2Savings,
    };
}

module.exports = getData;
