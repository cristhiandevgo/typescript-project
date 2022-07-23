let valorAny: any;
valorAny = 3;
valorAny = "Olá";
valorAny = true;

// Problema de usar o any
let valorString: string = "Teste";
valorString = true;
valorString = valorAny;

// 
let valorString2 = valorAny;

function somarString(string1: string, string2: string){
    console.log(string1 + string2);
}

somarString(valorString, valorString2); // Resultado: true + true = 2
somarString("Olá!", " Tudo bem?");