const keys = require('./keys')
const jwt = require('jsonwebtoken')
module.exports = login = (req, res, next)=> {
    jwt.verify(req.cookies.cookieToken, keys.secretOrKey, function (err, decoded) {
       req.cookies.cookieToken = decoded.admin;
       console.log(decoded.admin)
       if(decoded.admin === false){
            res.redirect('/consult')
            console.log('não autorizado')
       }
       else{
           next() 
       }
    })
  }




