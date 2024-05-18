var items = [];

function addItem() {
    var itemInput = document.getElementById('item').value.split(':');
    var itemName = itemInput[0].trim();
    var itemValue = parseFloat(itemInput[1]);
    items.push({ name: itemName, value: itemValue });
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(itemName + ' : ' + itemValue));
    li.addEventListener('click', function () {
        var index = items.findIndex(function (item) {
            return item.name === itemName && item.value === itemValue;
        });
        items.splice(index, 1);
        this.parentNode.removeChild(this);
        updateComparacao();
    });
    document.getElementById('itemList').appendChild(li);
    updateComparacao();
}

function updateComparacao() {
    var entrada = parseFloat(document.getElementById('entrada').value);
    document.getElementById('comparacao').innerHTML = '';
    items.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.name + ' x ' + Math.floor(entrada / item.value)));
        li.addEventListener('click', function () {
            if (entrada - item.value >= 0) {
                entrada -= item.value;
                var liCarrinho = document.createElement('li');
                liCarrinho.appendChild(document.createTextNode(item.name + ' : ' + item.value));
                liCarrinho.addEventListener('click', function () {
                    entrada += item.value;
                    document.getElementById('entrada').value = entrada;
                    this.parentNode.removeChild(this);
                    updateComparacao();
                });
                document.getElementById('carrinho').appendChild(liCarrinho);
                document.getElementById('entrada').value = entrada;
                updateComparacao();
            }
        });
        document.getElementById('comparacao').appendChild(li);
    });
    var totalValue = items.reduce(function (total, item) {
        return total + item.value;
    }, 0);
    document.getElementById('diferenca').innerHTML = 'Diferença: ' + (entrada - totalValue);
}