let btn = document.querySelector("#btn");
let input1 = document.querySelector("#n1") as HTMLInputElement;
let input2 = document.querySelector("#n2") as HTMLInputElement;
let resultEl = document.querySelector("#resultado") as HTMLDivElement;

type input = number | string;

function somarValores(input1: input, input2: input){    
    if(typeof input1 === "string" || typeof input2 === "string"){
        return String(input1) + String(input2);
    }else{
        return input1 + input2;
    }
}

console.log(somarValores(1, 1));
console.log(somarValores("1", "1"));
console.log(somarValores("Oi", 1));
console.log(somarValores("Oi!", " Tudo bem?"));
