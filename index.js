const itemLista = [];
const carrinho = {};

function criarElementoli(id, texto) {

    let textnode = document.createTextNode(texto);
    let li = document.createElement('li');
    let div = document.getElementById(id);
    li.appendChild(textnode);
    div.appendChild(li);
    return li;

}

function Lista() {

    //Adicionar Item
    let itemArray = document.getElementById('item').value.split(':');
    let itemNome = itemArray[0].trim();
    let itemValor = parseFloat(itemArray[1]);
    itemLista.push({ nome: itemNome, valor: itemValor });

    //Criar Elemento
    let texto = itemNome + ' : ' + itemValor;
    let li = criarElementoli('itemList', texto);

    //Atualizar Comparação
    Simular();

    //Remover Item
    li.addEventListener('click', function () {

        //Procurar Item
        let index = itemLista.findIndex(function (item) {
            return item.nome === itemNome && item.valor === itemValor;
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

    //Limpar Comparação
    document.getElementById('comparacao').innerHTML = '';

    itemLista.forEach(function (item) {

        //Criar Elemento
        let entrada = parseFloat(document.getElementById('entrada').value);
        let texto = item.nome + ' x ' + Math.floor(entrada / item.valor);
        let li = criarElementoli('comparacao', texto);

        //Reservar
        li.addEventListener('click', function () {
            if (entrada - item.valor >= 0) {

                //subtrair valor
                entrada -= item.valor;

                //adicionar item ao carrinho
                carrinho[item.nome] = (carrinho[item.nome] || 0) + 1;

                //atualizar entrada
                document.getElementById('entrada').value = entrada;

                //Atualizar Comparação e Carrinho
                Simular()
                Reservar();
            }
        });

    });
}

function Reservar() {
    //Limpar Carrinho
    document.getElementById('carrinho').innerHTML = '';

    for (var itemNome in carrinho) {
        //Criar Elemento
        let texto = itemNome + ' : ' + itemLista.find(function(item) { return item.nome === itemNome; }).valor + ' x ' + carrinho[itemNome];
        let li = criarElementoli('carrinho', texto);

        //Remover do Carrinho
        li.addEventListener('click', function () {

            var itemNome = this.textContent.split(':')[0].trim();
            var itemValor = itemLista.find(function(item) { return item.nome === itemNome; }).valor;

            let entrada = parseFloat(document.getElementById('entrada').value);
            entrada += itemValor;
            document.getElementById('entrada').value = entrada;

            carrinho[itemNome]--;
            if (carrinho[itemNome] === 0) {
                delete carrinho[itemNome];
            }

            Reservar();
            Simular();
        });
    }
}