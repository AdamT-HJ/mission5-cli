#! /usr/bin/env node

const mongoose = require('mongoose');
// import listings model to pass into functions
const Listings = require("./listing")

//dummy data for seed
const dummyListings = require('./dummyListings')




// TEST - ASYNC FUNCTION to CREATE LOTR LISTING 
//use (findbyid or findone) AND save to ensure schema validation runs.
// calling create lotr listing function
// createLotrListing()

async function createLotrListing () {
    try{
        const lotrListing = await Listings.create({title:"LOTR Book", description:"Lord of the Rings Book", start_price:100.25, reserve_price:250})
        // local change to lotrListing object
        lotrListing.title = "LOTR Hardback"
        // Save to DB
        await lotrListing.save()

        // first setup
        // const lotrListing = new Listings({ title: "LOTR Book", description: "Lord of the Rings book"})
        // await lotrListing.save()
    
        console.log(lotrListing)
    }catch (error){
        console.log(error.message)
    }
}

//functionality needed (min 20 of Kyles tute.)
//create & save
async function createListing (title, description, start_price, reserve_price, mongooseModel) {
    try{
        const newListing = await mongooseModel.create({
            title: title,
            description: description,
            start_price: new mongoose.Types.Decimal128(start_price.toString()),
            reserve_price: new mongoose.Types.Decimal128(reserve_price.toString()),
        });
        console.log(`Created new listing: ${newListing.title}`);     
        console.log(newListing);
        return newListing;
    }catch (error){
        console.log(error.message);
        throw error;
    }
};

//find .where for mongoose (min 21:22)

//find by id (using unique id created for each listing by MongoDD)
async function findById (id, mongooseModel) {
    try{
        const listing = await mongooseModel.findById(id);
        console.log(listing);  
        return listing;
    }catch (error){
        console.log(error.message);
        throw error;
    }
};

//find listing by title
async function findTitle (title, mongooseModel) {
    try{
        //regex for title to make case-insensitive 
        const regexTitle = new RegExp(title, 'i');

        const listing = await mongooseModel.find({title:{$regex: regexTitle}});
        console.log(listing);  
        return listing;
    }catch (error){
        console.log(error.message);
        throw error;
    }
};

//find by keyword in description or title '$or' MongoDB operator
async function findTitleOrDescriptionKeyword(keyword, mongooseModel) {
    try{
        //Regex for keyword case-insensitive
        const regexKeyword = new RegExp(keyword, 'i');

        const listing = await mongooseModel.find({
            $or: [
                {description: {$regex: regexKeyword}},
                {title: {$regex: regexKeyword}}
            ]
        });
        return listing;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

//update by ID, NO .update() or .updateOne() to ensure Schema Validation
// 'updates' to be an object containing fields to update and values
async function updateListingById(listingId, updates, mongooseModel){
    try{
        const listing = await mongooseModel.findById(listingId)
        if (!listing) {
            console.log('Listing id not found:', listingId);
            return null;
        }
        //for loop to update listing with 'updates' object
        for (const key in updates){
            if(Object.prototype.hasOwnProperty.call(updates, key)) {
                // bracket notation as don't know property ahead of time
                listing[key] = updates[key];
            }
        }
        const updatedListing = await listing.save();
        console.log('Listing updated succesfully:', updatedListing);
        return updatedListing
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Validation Error during listing update:', error.message);
            throw new Error(`Validation failed: ${error.message}`);
        } else if (error.name === 'CastError') {
            console.error('Cast Error during listing update (invalid ID or field value):', error.message);
            throw new Error(`Invalid data format: ${error.message}`);
        } else {
            console.error('Error updating listing:', error);
            throw new Error(`Failed to update listing: ${error.message}`);
        }
    }
};


//delete selected listing by ID
async function deleteById (id, mongooseModel) {
    try{
        const deletedListing = await mongooseModel.findOneAndDelete({_id: id});
        if(deletedListing) {
            console.log('Listing successfully deleted', deletedListing);
        }
        else{
            console.log('Listing id not found to delete');
        }
        return deletedListing
    }catch (error){
        console.log(error.message);
        throw error;
    }
};

//delete all 
async function deleteAll (mongooseModel) {
    try{
        const result = await mongooseModel.deleteMany()
        console.log(`All documents in collection Deleted. Count: ${result.deletedCount}`);
        return result;
    }catch (error){
        console.log(error.message);
        throw error;
    }
};


//Seed database with dummy data, create method accepts object/array of objects
async function seedDatabase(mongooseModel) {
    try {
        // Transform dummyListings to ensure Decimal128 types are correctly applied
        // before passing to create. Mongoose will often handle this if your schema
        // has `type: mongoose.Types.Decimal128` but explicitly doing it here ensures
        // the input matches the expected format for each document.
        const listingsToInsert = dummyListings.map(listing => ({
            ...listing,
            start_price: new mongoose.Types.Decimal128(listing.start_price.toString()),
            reserve_price: new mongoose.Types.Decimal128(listing.reserve_price.toString())
        }));

        // Use Model.create() with the array of documents
        const createdDocs = await mongooseModel.create(listingsToInsert);
        console.log(`Successfully seeded ${createdDocs.length} listings.`);
        
        console.log('Database Seeding Complete!');

    } catch (error) {
        console.error('An error occurred during seeding:', error.message);
    };
};

// seedDatabase(Listings)
// POTENTIAL ADDITIONS
// use bestfriend mongoose method to join listings to allow multiple update

//Export functions
module.exports = {
    createListing,
    findById,
    findTitle,
    findTitleOrDescriptionKeyword,
    updateListingById,
    deleteById,
    deleteAll,
    seedDatabase
}