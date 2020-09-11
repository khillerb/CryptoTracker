const mongoose = require('mongoose');
const { default: IndicesConstituents } = require('finnhub/dist/model/IndicesConstituents');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    symbol: String,
    companyProfile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    openPrice: Number,
    todayHigh: Number,
    todayLow: Number,
    currentPrice: Number,
    previousClose: Number
});



module.exports = mongoose.model('Tracker', listingSchema);
