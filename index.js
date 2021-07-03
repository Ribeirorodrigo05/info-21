const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const consign = require('consign');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3005;
const routes = require('./routes/router');
const session = require('express-session');
const flash = require('connect-flash')
const routerCliente = require('./routes/routerCliente')
const path  =  require('path')

//configurando sessão
app.use(session({
    secret:'info-store',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())
//middleware
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('sucess_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
    
})


//configuração arquivo estático
app.use(express.static(path.join(__dirname , "/public")))


//configuração mongoose
mongoose.connect('mongodb+srv://ribeirorodrigo05:rodrigo220391@info2021.6psl5.mongodb.net/infoClientes?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log('conectado ao Mongo')
}).catch((err) => {
    console.log('erro ao conectar => ' + err)
})


//configuração para receber os dados do formulário
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
consign().include('controllers').into(app)

//configuração do template handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.set('view engine', 'handlebars');


//rotas
app.use('/', routes)
app.use('/',routerCliente)

//servidor
app.listen(PORT,()=>{console.log('ONLINE')})

