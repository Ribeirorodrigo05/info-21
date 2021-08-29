const express = require('express');
const app = express();
const routerUser = require('./routes/api/usersApi');
const db = require('./config/db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const clients = require('./routes/api/clientApi');
const products = require('./routes/api/productApi');
const session = require('express-session');
const flash = require('connect-flash');
const keys = require('./config/keys');
const moment = require('moment');
const passport = require('passport');
const {isAdmin} = require('./config/permission')


const PORT = process.env.PORT || 5000;

//configurando sessão
app.use(session({
    secret:'ee4997abfd936eb8112d9dec6d62439f',
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//middlewere para sessão
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("msg_error")
    res.locals.user = req.user || null;
    next()
})

//configuração arquivo estático
app.use(express.static(path.join(__dirname , "./public")))

//body-parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//configuração do template handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers:{
        formatDate: (date) =>{
            return moment(date).format('DD/MM/YYYY')
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

app.set('view engine', 'handlebars');

//conetando o mongo
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('conectado ao Mongo')
}).catch((err) => {
    console.log('erro ao conectar => ' + err)
})
        
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use( '/', routerUser );
app.use('/',clients)
app.use('/',products)

app.get("/logout", (req, res) => {
    res.clearCookie("cookieToken")
    res.redirect("/")
  })


app.listen(PORT,()=>console.log('Online'));