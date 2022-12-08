const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');


dotenv.config(); //using to configure env file
//MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection Successful"))
  .catch((err) => {
    console.log(err);
  });
 app.use(express.json()); // for getting data of json file from postman
  //Creating Endpoints
  app.use('/api/users', (userRoute));
  app.use('/api/auth', (authRoute));

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is Running!");
});
