//EXPRESS SERVER

const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config("dotenv");

const connectDB = require("./database/connect");
const postRoute = require("./routes/posts");

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

//use routes for posts
app.use("/", postRoute);

//default route
app.get("/", (req, res) => {
    res.send("Hello, I am running successfully ");
});


//create database connection
connectDB(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
});

