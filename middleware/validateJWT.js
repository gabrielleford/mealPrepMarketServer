const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateJWT = async (req, res, next) => {
  if (req.method == 'OPTIONS') {
    next();
  } else if (
    req.headers.authorization && 
    req.headers.authorization.includes('Bearer')
  ) {
    const { authorization } = req.headers;
    const payload = authorization ? jwt.verify(
      authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization,
      process.env.JWT_SECRET
    ) : undefined;

    if (payload) {
      console.log(payload);
      let foundUser = await User.findOne({
        where: {
          id: payload.id
        }
      });

      if (foundUser) {
        req.user = foundUser;
        req.id = foundUser.dataValues.id;
        next();
      } else {
        res.status(400).send({
          message: 'Not Authorized'
        });
      }
    } else {
      res.status(401).send({
        message: 'Invalid token'
      });
    }
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
}

module.exports = validateJWT;