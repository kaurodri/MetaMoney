const itemLista = [];
const carrinho = {};

function Lista() {

    //Adicionar Item
    let itemArray = document.getElementById('item').value.split(':');
    let itemNome = itemArray[0].trim();
    let itemValor = parseFloat(itemArray[1]);
    itemLista.push({ nome: itemNome, valor: itemValor });

    //Criar Elemento
    let texto = document.createTextNode(itemNome + ' : ' + itemValor);
    let li = document.createElement('li');
    let div = document.getElementById('itemList');
    li.appendChild(texto);
    div.appendChild(li);

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
        let texto = document.createTextNode(item.nome + ' x ' + Math.floor(entrada / item.valor));
        let li = document.createElement('li');
        let div = document.getElementById('comparacao');
        li.appendChild(texto);
        div.appendChild(li);

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

    itemLista.forEach(function (item) {
        for (item.nome in carrinho) {

            //Criar Elemento
            let texto = document.createTextNode(item.nome + ' : ' + item.valor + ' x ' + carrinho[item.nome]);
            let li = document.createElement('li');
            let div = document.getElementById('carrinho');
            li.appendChild(texto);
            div.appendChild(li);

            //Remover do Carrinho
            li.addEventListener('click', function () {

                let entrada = parseFloat(document.getElementById('entrada').value);
                entrada += item.valor;
                document.getElementById('entrada').value = entrada;
                
                carrinho[item.nome]--;
                if (carrinho[item.nome] === 0) {
                    delete carrinho[item.nome];
                }
                Reservar();
                Simular();
            });
        }
    })
}