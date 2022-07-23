// let btn = document.querySelector("#btn");
// let n1 = document.querySelector("#n1") as HTMLInputElement;
// let n2 = document.querySelector("#n2") as HTMLInputElement;
// let resultEl = document.querySelector("#resultado") as HTMLDivElement;

// function soma(a: number, b: number, devePrintar: boolean, frase: string){
//     let resultado = a + b;
//     if(devePrintar){
//         console.log(frase + resultado);
        
//     }
// }

// let devePrintar = true;
// let frase = "O valor é: ";

// if(btn){
//     btn.addEventListener("click", () => {
//         if(n1 && n2){
//             soma(Number(n1.value), Number(n2.value), devePrintar, frase);
//         }
        
//     });
// }

let btn = document.querySelector("#btn");
let n1 = document.querySelector("#n1") as HTMLInputElement;
let n2 = document.querySelector("#n2") as HTMLInputElement;
let resultEl = document.querySelector("#resultado") as HTMLDivElement;

function soma(a: number, b: number, devePrintar: boolean){
    let resultado = a + b;
    if(devePrintar){
        resultEl.innerHTML = String(resultado);
    }

    return resultado;
}

let devePrintar = true;

if(btn){
    btn.addEventListener("click", () => {
        if(n1 && n2){
            soma(Number(n1.value), Number(n2.value), devePrintar);
        }
        
    });
}