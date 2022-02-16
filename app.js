require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

let whitelist = ['http://localhost:3000', 'https://mealprepmarket.herokuapp.com', 'https://mealprepmarket-admin.herokuapp.com']
app.use(cors({
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,HEAD',
  allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, Origin',
  preflightContinue: false,
}))

app.use(express.json());

app.use('/admin', controllers.admincontroller);
app.use('/user', controllers.usercontroller);
app.use('/listing', controllers.listingcontroller);
app.use('/order', controllers.ordercontroller);


dbConnection.authenticate()
  // .then(() => dbConnection.sync({force: true}))
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`[Server]: Server crashed. Error = ${error}`);
  })


  /* Super Mario 
  {
    "user": {
      "email": "mario@email.com",
      "password": "Mario12!"
    }
  }
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2NTQ1MDY4LTY5ODgtNGY0My1hNzRhLTEwZTM1MDIxZjc2NSIsImlhdCI6MTY0MzkxMTM3OCwiZXhwIjoxNjQzOTk3Nzc4fQ.DUYGMniZXBr128p9Xg04zuWQBIFYnfkRemDPShO9pgo

  Dwight Schrute
  23011121-6c44-460b-805f-a6f337da08ac
  {
    "user": {
        "email": "d.schrute@email.com",
        "password": "Password1!"
    }
}
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMDExMTIxLTZjNDQtNDYwYi04MDVmLWE2ZjMzN2RhMDhhYyIsImlhdCI6MTY0MzkxMTYxOSwiZXhwIjoxNjQzOTk4MDE5fQ.t7tcQAAWuSkH9gUGs1CfKE-hDLlfK5N1fRA-tWBjdhE


  Jim Halpert
  {
    "user": {
      "email": "j.halpert@email.com",
      "password": "Password1!"
    }
  }
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkNjI1YmIzLTg5MzUtNDExZi1iZjdiLWRmOWFjN2YzM2U2YSIsImlhdCI6MTY0MzkxMTQzMCwiZXhwIjoxNjQzOTk3ODMwfQ.jWNo6uAE7Iwggv9BkMUQWUFlzbNkp2HJzEl-ACYh99Y
  */