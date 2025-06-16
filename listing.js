const mongoose = require("mongoose");

// listing schema, object, key value pairs as per brief for trademe
const listingsSchema = new mongoose.Schema({
    title: String, 
    description: String,
    start_price: mongoose.Types.Decimal128,
    reserve_price: mongoose.Types.Decimal128,
    created_at: Date,
    updated_at: Date
});

 
// creating model and exporting
module.exports = mongoose.model("Listings", listingsSchema)