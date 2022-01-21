require('dotenv').config();
const express = require('express');
const app = express();
const dbConnection = require('./db');
const middleware = require('./middleware');

app.use(middleware.CORS);
app.use(express.json());




dbConnection.authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`[Server]: Server crashed. Error = ${error}`);
  })