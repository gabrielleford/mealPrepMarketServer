const ROLES = {
  admin: 'admin',
  primary: 'primary',
  secondary: 'secondary'
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role === role || req.user.role === 'admin') {
      next()
    } else {
      res.status(403).json({
        message: 'Forbidden action'
      })
    }
  }
}

module.exports = {
  ROLES,
  authRole
}
