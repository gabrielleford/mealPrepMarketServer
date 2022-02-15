const ROLES = {
  mainAdmin: 'main admin',
  admin: 'admin',
  primary: 'primary',
  secondary: 'secondary'
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role === role || req.user.role === 'admin' || req.user.role === 'main admin') {
      next()
    } else {
      res.status(403).json({
        message: 'Forbidden action'
      })
    }
  }
}

function mainAdmin(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
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
  authRole,
  mainAdmin,
}
