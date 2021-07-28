function validator(){
    let name = document.getElementById('name').value
    let tel =  document.getElementById('tel').value
    let errorName = document.getElementById('errorName')

    

    if(!name){
        errorName.innerHTML = 'Esse campo é obrigatório'
        alert('Digite o nome corretamente')
    }
    if(name < 3){
        errorName.innerHTML = 'Preencha o campo corretamente'
    }
   else{
       
    }


}