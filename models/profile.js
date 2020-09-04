const mongoose = require('mongoose');
const { default: IndicesConstituents } = require('finnhub/dist/model/IndicesConstituents');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    name: String,
    country: String,
    currency: String,
    finnhubIndustry: String,
    exchange: String
});

module.exports = mongoose.model('Profile', profileSchema);