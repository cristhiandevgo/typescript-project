const pessoa = {
    nome: "Mariana",
    idade: 28,
    profissao: "Desenvolvedor"
}

pessoa.idade = 29;

const andre: {nome: string, idade: number, profissao: string} = {
    nome: "André",
    idade: 25,
    profissao: "Pintor"
}

enum Profissao {
    Professora,
    Atriz,
    Desenvolvedora,
    JogadorDeFutebol
}

interface Pessoa{
    nome: string,
    idade: number,
    profissao?: Profissao
}

interface Estudante extends Pessoa{
    materias: string[]
}

const vanessa: Pessoa = {
    nome: "Vanessa",
    idade: 23,
    profissao: Profissao.Desenvolvedora
}

const jessica: Estudante = {
    nome: "Jéssica",
    idade: 28,
    profissao: Profissao.Atriz,
    materias: ["Matemática", "Programação"]
}

const monica: Estudante = {
    nome: "Mônica",
    idade: 28,
    materias: ["Matemática", "Programação"]
}

function listar(lista: string[]){
    for(const item of lista){
        console.log(" - ", item);
        
    }
}

listar(monica.materias);