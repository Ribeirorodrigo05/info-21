const keys = require('./keys')
const jwt = require('jsonwebtoken')
module.exports = permission = (req, res, next)=> {
    jwt.verify(req.cookies.cookieToken, keys.secretOrKey, function (err, decoded) {
       req.cookies.cookieToken = decoded.admin;
       if(decoded.admin === false){
            res.redirect('/consult')
       }
       else{
           next() 
       }
    })
  }




