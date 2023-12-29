const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config("dotenv");

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

app.get("/", (req, res) => {
    res.send("Hello, I am running successfully ");
});


const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
};

start();

