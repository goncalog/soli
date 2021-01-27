const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    size_kw: { type: Number, required: true, min: 0 },
    total_cost: { type: Number, required: true, min: 0 },
    total_cost_currency: { type: String, required: true },
    status: { type: String, required: true },    
    estimated_annual_return_percent: { type: Number, required: true, min: 0 },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    image_urls: { type: [String], required: true, default: undefined },
    estimated_total_co2_saved_ton: { type: Number, required: true, min: 0 },
    estimated_annual_production_kwh: { type: Number, required: true, min: 0 },
    payment_schedule: { type: String, required: true },
    risk_level: { type: String, required: true },
    year_start_production: { type: Number, required: true, min: 2000, max: new Date().getFullYear() + 1 },  
    real_annual_production_kwh: { type: [Number], required: true, default: undefined },    
    real_annual_payments: { type: [Number], required: true, default: undefined },
    payments_currency: { type: String, required: true },
    real_annual_return_percent: { type: [Number], required: true, default: undefined },    
    real_annual_co2_saved_ton: { type: [Number], required: true, default: undefined },    
});

// Virtual for project's url
// Does not work with arrow function
ProjectSchema
    .virtual('url')
    .get(function () {
        return `/content/project/${this._id}`;
    });

module.exports = mongoose.model('Project', ProjectSchema);
