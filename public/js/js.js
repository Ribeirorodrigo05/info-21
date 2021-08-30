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


setInterval(()=>{
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if(hour <10){
        hour = '0' + hour
    }

    if(second <10){
        second = '0' + second
    }


    document.getElementById('dateHour')
    .textContent = `${hour}:${minute}:${second}`
}, 1000)

console.log(setInterval())

    