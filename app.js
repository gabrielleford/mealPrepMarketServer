require('dotenv').config();
const express = require('express');
const app = express();
const dbConnection = require('./db');
const controllers = require('./controllers')
const middleware = require('./middleware');

app.use(middleware.CORS);
app.use(express.json());

app.use('/user', controllers.usercontroller);
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
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwOGU0YWU2LTRhYTYtNGU1ZS1iOTg5LTJiYzRiODJmZjZhZSIsImlhdCI6MTY0Mjg2ODA4MywiZXhwIjoxNjQyOTU0NDgzfQ.YmNE8RHzQvPKzgCysVMtmUUbskj_WY0uM1bSv1CFH8o
  Mario12!

  Michael Scott
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkYzNjODkwLWUyNzItNGU4Yi1hYWFmLTI4NTE5MGZiYTQ4YiIsImlhdCI6MTY0Mjc4OTY2OSwiZXhwIjoxNjQyODc2MDY5fQ.-0_2enVZQRenOWBghmwBMKAS3QpBAuO0cEOAc428BQc
  Password123!

  Jim Halpert
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNzRmMGE3LTg0OGQtNGQ4Mi1iOWM0LWI1MTM5NWEyMTQ4YiIsImlhdCI6MTY0Mjg2OTkzMywiZXhwIjoxNjQyOTU2MzMzfQ.ZT03dt94Hvyh3n0zxRwh5ppBaUXXM863HjUJUenXppI
  Password123!
  */