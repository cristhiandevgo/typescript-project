// Como podemos rodar isso em um arquivo .ts sem causar erros? 

// let employee = {};
// employee.code = 10;
// employee.name = "John";

interface Funcionario{
    nome: string,
    codigo: number
}

let john: Funcionario = {
    nome: "John",
    codigo: 10
}

console.log(john);
