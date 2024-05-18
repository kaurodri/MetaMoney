var items = [];
var carrinho = {};

function addItem() {
    var itemInput = document.getElementById('item').value.split(':');
    var itemName = itemInput[0].trim();
    var itemValue = parseFloat(itemInput[1]);
    items.push({name: itemName, value: itemValue});
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(itemName + ' : ' + itemValue));
    li.addEventListener('click', function() {
        var index = items.findIndex(function(item) {
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
    items.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.name + ' x ' + Math.floor(entrada / item.value)));
        li.addEventListener('click', function() {
            if (entrada - item.value >= 0) {
                entrada -= item.value;
                carrinho[item.name] = (carrinho[item.name] || 0) + 1;
                document.getElementById('entrada').value = entrada;
                updateCarrinho();
                updateComparacao();
            }
        });
        document.getElementById('comparacao').appendChild(li);
    });
}

function updateCarrinho() {
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
            updateCarrinho();
            updateComparacao();
        });
        document.getElementById('carrinho').appendChild(li);
    }
}