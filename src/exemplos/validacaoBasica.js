let btn = document.querySelector("#btn");
let n1 = document.querySelector("#n1");
let n2 = document.querySelector("#n2");

function soma(a, b){
    if(typeof a === "number" && typeof b === "number"){
        return a + b;
    }else{
        return Number(a) + Number (b);
    }
}

if(btn){
    btn.addEventListener("click", ()=> {
        console.log(soma(n1.value, n2.value));
    })
}