const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    investments: { type: Map, of: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
});

module.exports = mongoose.model('User', UserSchema);
