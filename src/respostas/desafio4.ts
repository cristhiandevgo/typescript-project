// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

let apiKey: string;
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container')! as HTMLDivElement;
let btnCriarLista = document.querySelector("#btn-lista-filmes") as HTMLButtonElement;
let nomeDaLista = document.querySelector("#nome-lista") as HTMLInputElement;
let exibeListaDeFilmes = document.querySelector("#lista-filmes") as HTMLDivElement;

// Buttons
loginButton?.addEventListener('click', async () => {
    preencherLogin();
    preencherSenha();
    preencherApi();
  await criarRequestToken();
  await logar();
  await criarSessao();
})

searchButton?.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = (<HTMLInputElement>document.getElementById('search')).value;
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
    console.log(item);
    
  }
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
})

btnCriarLista?.addEventListener("click", ()=> {
	
	if(exibeListaDeFilmes.innerText === ""){
		let p = document.createElement("p");
		console.log(p.innerText);

		p.innerHTML = "Lista de filmes";
		exibeListaDeFilmes.appendChild(p);

	}

	let ul = document.createElement("ul");
	let li = document.createElement("li");

	ul.id = String(nomeDaLista.value);
	li.appendChild(document.createTextNode(String(nomeDaLista.value)));
	ul.appendChild(li);

	exibeListaDeFilmes.appendChild(ul);
});

// End buttons

function preencherSenha() {
  password = (<HTMLInputElement>document.getElementById('senha')).value;
  validateLoginButton();
}

function preencherLogin() {
  username =  (<HTMLInputElement>document.getElementById('login')).value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = (<HTMLInputElement>document.getElementById('api-key')).value;
  
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

type Sessao = {
    url: string;
    method: string;
    body?: unknown | null;
}

class HttpClient {
  static async get(sessao: Sessao) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(sessao.method, sessao.url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }
      
      if (sessao.body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        sessao.body = JSON.stringify(sessao.body);        
      }
      request.send(sessao.body);
      
      
    })
  }
}

async function procurarFilme(query: string) {
  query = encodeURI(query)
  
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  
  return result;
}

async function adicionarFilme(filmeId: number) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}



async function criarRequestToken () {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = String(result.request_token);
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
    
  try {
    let result = await HttpClient.get({
      url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
      method: "GET"
    });

    let loginMsg: HTMLDivElement = document.querySelector("#login-msg")!;
    loginMsg.innerHTML = "Logado com sucesso!";
    setTimeout(() => {
      loginMsg.innerHTML = "";
    }, 5000);
    
    sessionId = result.session_id;
  } catch (error) {
    console.log(error);
  }
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: number, listaId: number) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}

{/* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/}