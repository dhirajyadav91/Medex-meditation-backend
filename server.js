const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const authRoute = require("./routes/authRoute.js");
const sessionRoute = require("./routes/sessionRoute.js");

//Creating Server
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//route  Api..
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/session", sessionRoute);

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

//Db connection
mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.send('Backend server is running');
});


//Starting Server
app.listen(process.env.PORT || 8080, () => console.log("Server running"));
