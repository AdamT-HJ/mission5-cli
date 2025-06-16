const mongoose = require("mongoose");

// listing schema, object, key value pairs as per brief for trademe
//including objects for parameters, type then properties.
//validation will only run with create/save mongoose methods
const listingsSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        minLength: [1, 'Title needs to be at least 1 character long.'],
        maxLength: 250,
    },
    description: {
        type: String,
        required: true,
        // more concise way to do validate check below
        minLength:[1, 'Description needs to be at least 1 character long.'],
        validate: {
            // if validator is 'true' check passes, if 'false' message
            validator: v => v.length <= 1500,
            message: props => `${props.value} is greater than 1500 character limit`,
        },
    },
    start_price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    reserve_price: { 
        type: mongoose.Types.Decimal128,
        required: true,
    },
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updated_at: {
        type: Date,
        default: () => Date.now(),
    },
});

// ----- SCHEMA MIDDLEWARE

// to update 'updated_at' date before save
// 'next' prop, to continue on to next code in this case save
listingsSchema.pre('save', function(next){
    this.updated_at = Date.now()
    next()
})


//to message user when save has occurred
listingsSchema.post('save', function(){
    console.log("Listing saved")
})


// ----- END OF SCHEMA MIDDLEWARE 


// creating model and exporting
module.exports = mongoose.model("Listings", listingsSchema)