function subMenuAppear(){
    let subList = document.getElementById("subList")
    subList.style.display = 'block'
}

function subMenuHide(){
    let subList = document.getElementById("subList")
    subList.style.display = 'none'
}


/*document.querySelectorAll('[info-web]').forEach(link=>{
    const conteudo = document.getElementById('main')
    link.onclick = function(e){
      e.preventDefault()
      fetch(link.getAttribute('info-web'))
      .then(resp=>resp.text())
      .then(html =>conteudo.innerHTML = html)
    }
  })

function mesmaPagina(){
  document.querySelectorAll('[info-web]').forEach(link=>{
      const conteudo = document.getElementById('main')
      link.onclick = function(e){
        e.preventDefault()
        fetch(link.getAttribute('info-web'))
        .then(resp=>resp.text())
        .then(html =>conteudo.innerHTML = html)
      }
    })
  }
  function changeHeader(){
    let headerLabel = document.getElementById('headerLabel')
    headerLabel.innerHTML = 'Ordem de Serviço'
  }

  function validacao(){
    let name = document.getElementById('name').value;
    let tel = document.getElementById('tel').value;
    let marca = document.getElementById('marca').value;
    const telefone = parseInt(tel)

    


    if(!name || typeof name == undefined || name == null || name.length < 3)
    {
      alert('Preencha o nome corretamente!')
    }
     if(!tel || typeof tel == undefined || tel == null || tel.length < 11  ){
       alert('Preencha o telefone corretamente')
     }
  }*/