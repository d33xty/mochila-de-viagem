const form = document.querySelector('[data-form]');
const lista = document.querySelector('[data-lista]');
const listaItems = JSON.parse(localStorage.getItem("itens")) || [];

listaItems.forEach(element => {
    criaElemento(element);
});

form.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    
    const existe = listaItems.find(element => element.nome === itemAtual.nome);
    
    if (existe) {
        itemAtual.id = existe.id;
        atualizaItem(itemAtual);

        listaItems[listaItems.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{
        itemAtual.id = listaItems[listaItems.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemAtual);
        listaItems.push(itemAtual);

        nome.value = "";
        quantidade.value = "";
    }
    
    localStorage.setItem("itens", JSON.stringify(listaItems));
})

function criaElemento(item) {
    const itemCriado = document.createElement('li');
    itemCriado.classList.add('item');

    const itemNumero = document.createElement('strong');
    itemNumero.innerHTML = item.quantidade;
    itemNumero.dataset.id = item.id;

    itemCriado.appendChild(itemNumero);
    itemCriado.innerHTML += item.nome;
    
    itemCriado.appendChild(botaoDeleta(item.id));

    lista.appendChild(itemCriado);
}

function atualizaItem(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const botaoDeleta = document.createElement('button');
    botaoDeleta.textContent = 'X';
    botaoDeleta.addEventListener('click', function(){
        deletaItem(this.parentNode,id);
    })

    return botaoDeleta;
}

function deletaItem(item, id){
    item.remove();
    listaItems.splice(listaItems.findIndex(elemento => elemento.id === id),1);
    localStorage.setItem("itens", JSON.stringify(listaItems))
}
