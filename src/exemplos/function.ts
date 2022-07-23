// function somaValoresNumericos(numero1: number, numero2: number){
//     return numero1 + numero2.toString(); // Como se proteger desse  tipo de erro
// }

// function somaValoresNumericos(numero1: number, numero2: number): number{ // Define o tipo de retorno da função
//     return numero1 + numero2;
// }

// console.log(somaValoresNumericos(1, 1));


function printaValoresNumericos(numero1: number, numero2: number): void{
    console.log(numero1 + numero2);
}

// Callback
// Posso chamar várias funções diferentes em uma chamada
function somaValoresNumericosETratar(numero1: number, numero2: number, Callback: (numero: number) => number): number{ // Define o tipo de retorno da função
    let resultado = numero1 + numero2;
    return Callback(resultado);
}

function aoQuadrado(numero: number): number{
    return numero * numero;
}

function dividirPorEleMesmo(numero: number): number{
    return numero / numero;
}

console.log(somaValoresNumericosETratar(1, 3, aoQuadrado));
console.log(somaValoresNumericosETratar(1, 3, dividirPorEleMesmo));
