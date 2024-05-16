let content = '"Acaí":26, "X-Resenha":35';
let obj = JSON.parse(`{${content}}`);

obj["Acaí"]

let dados = content.split(", ");
const players = [];
const rs = [];
let tam = dados.length;

{
    let c = 0;
    while (c < tam) {
        try {
            let dadi = dados[c].split(":")
            dadi.shift()
            players.push([dados[c].split(":")[0], dadi.join('')])
            rs.push(dados[c].split(":")[0])
            c++;
        } catch (erro) {
            console.log('[Erro] - :' + erro.message)
        }
    }
    var lista = new Map(players)
}

console.log(lista.get(rs[0]))
