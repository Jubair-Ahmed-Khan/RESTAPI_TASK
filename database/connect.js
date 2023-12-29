const mongoose = require("mongoose");

const databaseConnection = async (callback) => {
    try {
        if (process.env.MONGODB_URL) {
            const connected = await mongoose.connect(process.env.MONGODB_URL);
            if (connected) {
                console.log("Database connection successfully made");
                callback();
            }
        } else {
            console.log("No Database URL provided");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = databaseConnection;