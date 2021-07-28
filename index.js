const express = require('express');
const app = express();
const routerUser = require('./routes/api/usersApi');
const db = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const passport = require('passport');
require('./config/passport')(passport);
const cookieParser = require('cookie-parser');
const clients = require('./routes/api/clientApi');
const session = require('express-session');
const flash = require('connect-flash');

const PORT = process.env.PORT || 5000;

//configurando sessão
app.use(session({
    secret:'ee4997abfd936eb8112d9dec6d62439f',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())
//middlewere para sessão
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("errror_msg")
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
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

app.set('view engine', 'handlebars');

//conetando o mongo
mongoose.connect(db.mongoURL , { useNewUrlParser:true, useUnifiedTopology: true } )
        .then(()=>console.log('mongo is connect'))
        .catch(err => console.log(err));
        
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use( '/', routerUser );
app.use('/',clients)


app.listen(PORT,()=>console.log('Online'));