document.querySelectorAll('.price').forEach(node=>{
    node.textContent=new Intl.NumberFormat('ru-Ru',{
      currency: 'UAH',
      style:'currency'  
    }).format(node.textContent)
})