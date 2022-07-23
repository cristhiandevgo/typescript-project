// Diferença de any e unknown
let anyEstaDeVolta: any;

anyEstaDeVolta = 3;
anyEstaDeVolta = "Olá";
anyEstaDeVolta = true;

let stringTeste1 = "Teste";
stringTeste1 = anyEstaDeVolta;

let unknownValor: unknown;
unknownValor = 3;
unknownValor = "Olá";
unknownValor = true;

let stringTeste2: string = "Agora vai";
if(typeof unknownValor === "string"){
    stringTeste2 = unknownValor;
}

// 

function jogaErro(erro: string, codigo: number): never{ // never: código não finalizado/interrompido
    throw {error: erro, code: codigo}
}

jogaErro("Deu erro", 500);