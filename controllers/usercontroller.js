const router = require('express').Router();
const { User } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateJWT = require('../middleware/validateJWT');

// ** REGISTER USER ** //
router.post('/register', async (req, res) => {
  let {role, firstName, lastName, email, password} = req.body.user;

  // Backend form validation
  const emailRegex = 
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  if (!email.match(emailRegex)) 
    return res.status(400).json({
      message: 'Email not valid'
    });

  if (!password.match(passRegex)) 
    return res.status(400).json({
      message: 'Password not valid'
    });

  if (firstName.length < 3) 
    return res.status(400).json({
      message: 'First name must be at least 3 characters long'
    });
  else if (firstName.length > 50)
    return res.status(400).json({
      message: 'First name must be less than 50 characters'
    });

  if (lastName.length < 3) 
    return res.status(400).json({
      message: 'Last name must be at least 3 characters long'
    }); 
  else if (lastName.length > 50) 
    return res.status(400).json({
      message: 'Last name must be less than 50 characters'
    });

  // Create new user
  try {
    const user = await User.create({
      role,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
      profilePicture: '',
      profileDescription: '',
    });

    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User successfully created",
      user: user,
      sessionToken: token,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({
        message: 'Email already in use'
      });
    } else {
      res.status(500).json({
        message: `Failed to register user: ${error} `
      })
    }
  }
})

// ** LOGIN USER ** //
router.post('/login', async (req, res) => {
  const { email, password } = req.body.user;

  try {
    const loginUser = await User.findOne({
      where: {
        email: email
      }
    })

    if (loginUser) {
      const passComparison = await bcrypt.compare(
        password,
        loginUser.password
      );

      if(passComparison) {
        let token = jwt.sign(
          { id: loginUser.id },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );

        res.status(200).json({
          message: 'User successfully logged in',
          user: loginUser,
          sessionToken: token
        });
      } else {
        res.status(401).json({
          message: 'Email or password incorrect'
        })
      }
    } else {
      res.status(401).json({
        message: 'Email or password incorrect',
      });
    }
  }
  catch(error) {
    res.status(500).json({
      message: `Failed to log user in: ${error}`
    })
  }
})

// ** GET PRIMARY USERS ** //
router.get('/all', async (req,res) => {
  try {
    const users = await User.findAll({
      where: {
        role: 'primary'
      }
    });

    res.status(200).json({
      users: users
    });
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to fetch users: ${error}`
    });
  }
})

// ** GET PRIMARY USER BY ID ** //
router.get('/:id', async (req, res) => {
  id = req.params.id;

  try {
    const user = await User.findOne({
      where: {
        id: id,
        role: 'primary'
      }
    });

    res.status(200).json({
      user: user
    });
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to get user: ${error}`
    });
  }
})

module.exports = router;