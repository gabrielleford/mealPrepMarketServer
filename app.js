require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({credentials: true, origin: 'http://localhost:3000'}, exposedHeaders,'Content-Range'));
const dbConnection = require('./db');
const controllers = require('./controllers');
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