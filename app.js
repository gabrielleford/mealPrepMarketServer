require('dotenv').config();
const express = require('express');
const app = express();
const dbConnection = require('./db');
const controllers = require('./controllers')
const middleware = require('./middleware');

app.use(middleware.CORS);
app.use(express.json());

app.use('/user', controllers.usercontroller);
app.use(middleware.validateJWT);
app.use('/listing', controllers.listingcontroller);
app.use('/order', controllers.ordercontroller);

dbConnection.authenticate()
  .then(() => dbConnection.sync(/*{force: true}*/))
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`[Server]: Server crashed. Error = ${error}`);
  })


  /* Super Mario 
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwOGU0YWU2LTRhYTYtNGU1ZS1iOTg5LTJiYzRiODJmZjZhZSIsImlhdCI6MTY0Mjc4OTA1OCwiZXhwIjoxNjQyODc1NDU4fQ.kzQ4eR2fswW6eefGqwRBqqgok5hKplrZNJoaWnLMGRk
  Mario12!

  Michael Scott
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkYzNjODkwLWUyNzItNGU4Yi1hYWFmLTI4NTE5MGZiYTQ4YiIsImlhdCI6MTY0Mjc4OTY2OSwiZXhwIjoxNjQyODc2MDY5fQ.-0_2enVZQRenOWBghmwBMKAS3QpBAuO0cEOAc428BQc
  Password123!
  */