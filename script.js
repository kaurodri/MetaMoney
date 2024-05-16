let txt = "Açaí - 26\nX-Resenha - 35";
let dados = txt.split("\n");
const players = [];
let tam = dados.length;

var c = 0;
while (c < tam) {
    try {
        let dadi = dados[c].split("-")
        dadi.shift()
        players.push([dados[c].split("-")[0], dadi])
        c++;
    } catch (erro) {
        console.log('[Erro] - :' + erro.message)
    }
}
var lista = new Map(players)

console.log(players)