
const mongoose = require('mongoose');
// import listings model
const Listings = require("./listing")


//Defining default MongoDB connection
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

connectDB()

// END of connection setup



//user.save async function

createLotrListing()

async function createLotrListing () {
    const lotrListing = new Listings({ title: "LOTR Book", description: "Lord of the Rings book"})
    await lotrListing.save()
   
    console.log(lotrListing)
}

