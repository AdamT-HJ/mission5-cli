#! /usr/bin/env node

const {Command} = require('commander');
const program = new Command();

const mongoose = require('mongoose');

const inquirer = require('inquirer');



//import Listings Model
const Listings = require("./listing");

const {
    createListing,
    findById,
    findTitle,
    findTitleOrDescriptionKeyword,
    updateListingById,
    deleteById,
    deleteAll,
    seedDatabase
} = require('./script');

//database connection
//Defining default MongoDB connection 'trademe' will be created when first listing created
const MONGODB_URI = 'mongodb://127.0.0.1:27017/trademe';

//CONNECTION EVENT LISTENERS

// connecting
mongoose.connection.on('connecting', ()  => {
    console.log('Mongoose: Attempting to connect to MongoDB...');
});

// connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose: Connected to MongoDB!');
});

// connection error
mongoose.connection.on('error', (err)=>{
    console.error('Mongoose: Connection error"', err);
});

// connection lost or disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose: Disconnected from MongoDB!');
});

// connection reconnected
mongoose.connection.on('reconnected', () => {
    console.log('Mongoose: Reconnected to MongoDB');
});

// connection closed
mongoose.connection.on('close', () => {
    console.log('Mongoose: Connection closed');
});


// connect function async to make sure database only runs after connection confirmed
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database connection ready. Enter CLI commands.');
    } catch (error) {
        console.error('ERROR!!: Database connection failed to startup', error);
        process.exit(1);
    }    
};

// Disconnect function 
async function disconnectDB() {
    try {
        if (mongoose.connection.readyState === 1) { // 1 means connected
            await mongoose.disconnect();
            console.log('CLI: Disconnected from MongoDB.');
        }
    } catch (error) {
        console.error('CLI ERROR!!: Error disconnecting from MongoDB:', error.message);
    }
}


// END of connection setup


//Commander

program
    .name('trademe-cli')
    .description('Trademe Listings Management System')
    .version('1.0.0');

    //1. SEED database with dummy data
program
    .command('seed')
    .description('Seeds the database with dummy listing data.')
    .action(async () => {
        await connectDB();
        try {
            await seedDatabase(Listings);
            console.log("Database Seeded with Dummy Data.");
        } catch (error){
            console.error('Error during seed command:', error.message);
            throw error;
        } finally {
            await disconnectDB();
        }
    });

    //2. Create Listing (with inquirer)
program 
    .command('create')
    .description('Create a new listing')
    .action(async()=>{
        await connectDB();
        try{
            const questions = [
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter listing title:',
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Enter listing description:',
                },
                {
                    type: 'input',
                    name: 'start_price',
                    message: 'Enter starting price:',
                },
                {
                    type: 'input',
                    name: 'reserve_price',
                    message: 'Enter reserve price:',
                }
            ];
            const answers = await inquirer.default.prompt(questions);

            await createListing(
                answers.title,
                answers.description,
                parseFloat(answers.start_price),
                parseFloat(answers.reserve_price),
                Listings
            );
            console.log("Listing added");
        } catch (error) {
            console.error('Error adding listing:', error.message);
            throw error;
        } finally {
            await disconnectDB();
        }
    });

    // 3. findById
   program
    .command('find-by-id <id>')
    .description("Find a listing by it's unique ID.")
    .action(async (id) => {
        await connectDB();
        try{
            const listing = await findById(id, Listings);
            if (listing){
                console.log('Listing found', listing);
            } else {
                console.log('Listing not found with provided id.');
            }
        } catch (error) {
            console.error('Error executing find-by-id:', error.message);
            throw error;
        } finally {
            await disconnectDB();
        }
    });

    // 4. findTitle
    program
        .command('find-by-title <title>')
        .description("Find a listing by it's title.")
        .action(async (title) =>{
            await connectDB();
            try{
                const listings = await findTitle(title, Listings);
                if (listings){
                console.log(`${listings.length} listing(s) found'`);
                console.log(listings)
            } else {
                console.log('No listing(s) found with provided title.');
            }
        } catch (error) {
            console.error('Error executing find-by-title:', error.message);
            throw error;
        } finally {
            await disconnectDB();
        }
    });

    //5. find title or description by keyword
    program
        .command('find-keyword <keyword>')
        .description('Find title or description containing keyword.')
        .action(async(keyword) =>{
            await connectDB();
            try{
                const listings = await findTitleOrDescriptionKeyword(keyword, Listings);
                if (listings){
                console.log(`${listings.length} listing(s) found'`);
                console.log(listings)
            }else {
                console.log('No listing(s) found with provided title.');
            }
        } catch (error) {
            console.error('Error executing find-by-title:', error.message);
            throw error;
        } finally {
            await disconnectDB();
        }
    });

    //6. Update 
    program
        .command('update <id>')
        .description('Find and update a listing by ID.')
        .argument('<id>', 'The ID of the listing to update')
        .action(async(id) => {
            await connectDB();
            try{
                const listingToUpdate = await findById(id, Listings);
                if (!listingToUpdate) {
                    console.log('Listing not found with ID provided. Cannot update.');
                    await disconnectDB();
                    return;
                }
                
                const updateQuestions = [
                    {
                        type: 'input',
                        name: 'title',
                        message: `Enter new Title (current: ${listingToUpdate.title}):`,
                        default : listingToUpdate.title
                    },
                    {
                        type: 'input',
                        name: 'description',
                        message: `Enter new description (current: ${listingToUpdate.description}):`,
                        default: listingToUpdate.description
                    },
                    {
                        type: 'input',
                        name: 'start_price',
                        message: `Enter new starting price (current: ${listingToUpdate.start_price.toString()}):`,
                        default: listingToUpdate.start_price.toString(),
                        validate: value => {
                        const parsed = parseFloat(value);
                        if (isNaN(parsed) || parsed < 0) {
                            return 'Please enter a valid positive number for the starting price.';
                        }
                        return true;
                    },
                    filter: value => parseFloat(value) // Convert to number immediately
                    },
                    {
                        type: 'input',
                        name: 'reserve_price',
                        message: `Enter new reserve price (current: ${listingToUpdate.reserve_price.toString()}):`,
                        default: listingToUpdate.reserve_price.toString(),
                        validate: value => {
                        const parsed = parseFloat(value);
                        if (isNaN(parsed) || parsed < 0) {
                            return 'Please enter a valid positive number for the reserve price.';
                        }
                        return true;
                    },
                    filter: value => parseFloat(value) // Convert to number immediately
                    }
                ];

            const answers = await inquirer.default.prompt(updateQuestions); // FIX: Access via .default.prompt

            // Filter out unchanged values or nulls from answers to create a clean 'updates' object
            const updates = {};
            // For strings, only update if the new value is different from the old AND not empty
            if (answers.title !== listingToUpdate.title && answers.title.trim() !== '') {
                updates.title = answers.title;
            }
            if (answers.description !== listingToUpdate.description && answers.description.trim() !== '') {
                updates.description = answers.description;
            }
            // For numbers, compare parsed values
            // Note: listingToUpdate.start_price is Decimal128, answers.start_price is float after filter
            // Compare string representations or convert Decimal128 to float for comparison
            if (parseFloat(listingToUpdate.start_price.toString()) !== answers.start_price) { 
                updates.start_price = answers.start_price;
            }
            if (parseFloat(listingToUpdate.reserve_price.toString()) !== answers.reserve_price) { 
                updates.reserve_price = answers.reserve_price;
            }

            if (Object.keys(updates).length === 0) {
                console.log('No changes detected or provided. Listing remains unchanged.');
                return;
            }

            console.log('Applying updates:', updates);
            const updatedListing = await updateListingById(id, updates, Listings);
            if (updatedListing) {
                console.log('Listing updated successfully:', updatedListing);
            } else {
                console.log('Listing could not be updated.');
            }
            console.log('Update command completed.');

        } catch (error) {
            console.error('Error executing update command:', error.message);
            throw error; 
        } finally {
            await disconnectDB();
        }
    });
   
    // 7. Delete listing by ID
    program
        .command('delete-by-id <id>')
        .description('delete a listing by its ID.')
        .action(async (id)=> {
            await connectDB();
            try{
                const deleted = await deleteById(id, Listings);
                if (deleted){
                    console.log('Listing Deleted.');
                } else {
                    console.log('No Listing with that ID found to delete.');
                } 
            } catch (error){
                console.error("Error executing delete-by-id command:", error.message);
                throw error;
            } finally {
                await disconnectDB();
            }
        });

    //8. Delete all
    program 
        .command('delete-all')
        .description('Delete ALL listing from database. IRREVERSIBLE!!')
        .action(async() => {
            await connectDB();
            try{
                const {confirmDelete} = await inquirer.default.prompt([
                    {
                        type: 'confirm',
                        name: 'confirmDelete',
                        message: 'Sure you want to delete ALL listings?',
                        default: false
                    }
                ]);

                if (confirmDelete) {
                    const result = await deleteAll(Listings);
                    console.log(`Deleted ALL ${result.deletedCount} listings.`);
                } else {
                    console.log("Delete cancelled. No Deletion.");
                }

            } catch (error){
                console.error('Error running delete-all command:',error.message);
                throw error;
            } finally {
                disconnectDB();
            }
        });


program.parse(process.argv);

