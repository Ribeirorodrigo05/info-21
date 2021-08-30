const keys = require('./keys');
const jwt = require('jsonwebtoken');
module.exports = login = (req, res, next)=> {
    jwt.verify(req.cookies.cookieToken, keys.secretOrKey, function (err, decoded) {
      if (err) {
        res.redirect("/")
      } else {
        next()
      }
    })
  }




