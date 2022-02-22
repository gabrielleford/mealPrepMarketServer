const router = require('express').Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const validateJWT = require('../middleware/validateJWT');
const { authRole, mainAdmin, ROLES } = require('../middleware/permissions');

/* -------------------------------------- 
           * ADMIN ENDPOINTS *
  --------------------------------------- */

// ** GET ALL USERS ** //
router.get('/users', validateJWT, authRole(ROLES.admin), async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {role: 'primary'},
          {role: 'secondary'}
        ]
      },
      order: [
        ['lastName']
      ]
    })
    res.status(200).json(users)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// ** GET ADMINS & USERS ** //
// endpoint for main admin
router.get('/admins', validateJWT, mainAdmin(ROLES.mainAdmin), async (req, res) => {
  try {
    const users = await User.findAll({
      order: [
        ['lastName']
      ]
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: `Failed to get users: ${error}`
    })
  }
})

// ** GET INDIVIDUAL USERS - EVEN SECONDARY ** //
router.get('/any/:id', validateJWT, authRole(ROLES.admin), async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: {
        id: id
      }
    })
    res.status(200).json(user)
  } catch(error) {
    res.status(500).json({
      message: `Failed to get user: ${error}`
    })
  }
})

// // ** MAKE USER ADMIN ** //
// router.post('/:id', validateJWT, mainAdmin(ROLES.mainAdmin), async (req, res) => {
//   const { role } = req.body.user;
//   const id = req.params.id;

//   const updateRole = {
//     role,
//   }

//   const query = {
//     where: {
//       id: id
//     }
//   }

//   try {
//     await User.update(updateRole, query)
//     res.status(200).json({
//       message: 'Successfully updated user',
//       userRole: updateRole
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: `Failed to update user: ${error}`
//     })
//   }
// })

module.exports = router;