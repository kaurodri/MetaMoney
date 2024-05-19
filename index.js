const itemLista = [];
const carrinho = {};

function Lista() {

    //Adicionar Item
    let itemArray = document.getElementById('item').value.split(':');
    var itemNome = itemArray[0].trim();
    var itemValor = parseFloat(itemArray[1]);
    itemLista.push({nome: itemNome, valor: itemValor});

    //Criar Elemento
    let texto = document.createTextNode(itemNome + ' : ' + itemValor);
    let li = document.createElement('li');
    let div = document.getElementById('itemList');
    li.appendChild(texto);
    div.appendChild(li);
    
    //Atualizar Comparação
    Simular();

    //Remover Item
    li.addEventListener('click', function() {

        //Procurar Item
        let index = itemLista.findIndex(function(item) {
            return item.name === nomeItem && item.value === itemValue;
        });

        //Remover Texto
        itemLista.splice(index, 1);

        //Remover Elemento
        this.parentNode.removeChild(this);

        //Atualizar Comparação
        Simular();
    });
}

function Simular() {
    var entrada = parseFloat(document.getElementById('entrada').value);
    document.getElementById('comparacao').innerHTML = '';
    items.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.name + ' x ' + Math.floor(entrada / item.value)));
        li.addEventListener('click', function() {
            if (entrada - item.value >= 0) {
                entrada -= item.value;
                carrinho[item.name] = (carrinho[item.name] || 0) + 1;
                document.getElementById('entrada').value = entrada;
                Reservar();
                Simular();
            }
        });
        document.getElementById('comparacao').appendChild(li);
    });
}

function Reservar() {
    document.getElementById('carrinho').innerHTML = '';
    for (var itemName in carrinho) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(itemName + ' : ' + items.find(function(item) { return item.name === itemName; }).value + ' x ' + carrinho[itemName]));
        li.addEventListener('click', function() {
            var itemName = this.textContent.split(':')[0].trim();
            var itemValue = items.find(function(item) { return item.name === itemName; }).value;
            entrada += itemValue;
            document.getElementById('entrada').value = entrada;
            carrinho[itemName]--;
            if (carrinho[itemName] === 0) {
                delete carrinho[itemName];
            }
            Reservar();
            Simular();
        });
        document.getElementById('carrinho').appendChild(li);
    }
}