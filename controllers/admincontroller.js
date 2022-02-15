const router = require('express').Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const validateJWT = require('../middleware/validateJWT');
const { mainAdmin, ROLES } = require('../middleware/permissions');

// ** Admin Login ** //
router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body.user;

  try {
    const loginUser = await User.findOne({
      where: {
        [Op.or]: [
          {role: 'admin'},
          {role: 'main admin'}
        ],
        email: email,
      }
    });

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

        res.status(201).json({
          message: 'User successfully logged in',
          user: loginUser,
          sessionToken: token
        });
      } else {
        res.status(401).json({
          message: 'Email or password incorrect'
        });
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
    });
  }
})

// ** MAKE USER ADMIN ** //
router.post('/:id', validateJWT, mainAdmin(ROLES.mainAdmin), async (req, res) => {
  const { role } = req.body.user;
  const id = req.params.id;

  const updateRole = {
    role,
  }

  const query = {
    where: {
      id: id
    }
  }

  try {
    await User.update(updateRole, query)
    res.status(200).json({
      message: 'Successfully updated user',
      userRole: updateRole
    })
  } catch (error) {
    res.status(500).json({
      message: `Failed to update user: ${error}`
    })
  }
})

module.exports = router;