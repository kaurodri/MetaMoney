let content = '"Acaí":26, "X-Resenha":35';
let obj = JSON.parse(`{${content}}`);

let dados = content.split(", ");
const players = [];
const itens = [];
let tam = dados.length;

{
    let c = 0;
    while (c < tam) {
        try {
            let dadi = dados[c].split(":")
            dadi.shift()
            players.push([dados[c].split(":")[0], dadi.join('')])
            itens.push(dados[c].split(":")[0])
            c++;
        } catch (erro) {
            console.log('[Erro] - :' + erro.message)
        }
    }
    var lista = new Map(players)
}

let meta = 200;
let num = '26';

let final = meta / Number(num);

let ff = Number(lista.get(itens[0]));
let gg = Math.floor(final);

console.log(ff);
