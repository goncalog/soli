const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    investments: { type: Map, of: Object, required: true }, // e.g. { 2020: 100, 2021: 50 }; this means the User invested 100 in 2020 and another 50 in 2021 (for a total of 150)
    rating: { type: Number, min: 0, max: 5 },
});

module.exports = mongoose.model('User', UserSchema);
