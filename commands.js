
const program = require('commander');

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

program
    .version('1.0.0')
    .description('Trademe Listings Management System')

program.parse(process.argv);

