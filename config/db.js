if(process.env.NODE_ENV){
    module.exports = { mongoURI: 'mongodb+srv://ribeirorodrigo05:rodrigo220391@info2021.6psl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'}    
}else{
    module.exports = { mongoURI :'mongodb://localhost/db_infoSolucoes'}    

}