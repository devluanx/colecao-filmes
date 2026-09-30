
const inputTitulo = document.querySelector("#input-titulo");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaFilmes = document.querySelector("#lista-filmes");
const mensagem = document.querySelector("#mensagem");


let filmes = [];


function salvarFilmes() {
  const filmesEmTexto = JSON.stringify(filmes);

  localStorage.setItem("meus_filmes", filmesEmTexto);
}

function carregarFilmes() {
  const filmesEmTexto = localStorage.getItem("meus_filmes");

  if (filmesEmTexto === null) {
    filmes = [];
    return;
  }

  filmes = JSON.parse(filmesEmTexto);
}

function adicionarFilme() {
  const titulo = inputTitulo.value.trim();

  if (titulo === "") {
    mensagem.textContent = "Digite o título de um filme antes de adicionar.";

    mensagem.className = "mensagem erro";

    return;
  }

  const novoFilme = {
    id: Date.now(),
    titulo: titulo,
    assistido: false,
  };

  filmes.push(novoFilme);

  salvarFilmes();
  renderizarFilmes();

  inputTitulo.value = "";

  mensagem.textContent = "Filme adicionado com sucesso!";

  mensagem.className = "mensagem sucesso";

  inputTitulo.focus();
}

function alternarAssistido(id) {
  const filmeEncontrado = filmes.find(function (filme) {
    return filme.id === id;
  });

  if (filmeEncontrado === undefined) {
    mensagem.textContent = "Não foi possível localizar o filme.";

    mensagem.className = "mensagem erro";

    return;
  }

  filmeEncontrado.assistido = !filmeEncontrado.assistido;

  salvarFilmes();
  renderizarFilmes();

  mensagem.textContent = "Status do filme atualizado.";

  mensagem.className = "mensagem sucesso";
}

function excluirFilme(id) {
  filmes = filmes.filter(function (filme) {
    return filme.id !== id;
  });

  salvarFilmes();
  renderizarFilmes();

  mensagem.textContent = "Filme excluído com sucesso.";

  mensagem.className = "mensagem sucesso";
}

function renderizarFilmes() {
  listaFilmes.innerHTML = "";

  if (filmes.length === 0) {
    const itemVazio = document.createElement("li");

    itemVazio.textContent = "Nenhum filme cadastrado.";

    itemVazio.className = "filme";

    listaFilmes.appendChild(itemVazio);

    return;
  }

  filmes.forEach(function (filme) {
    const item = document.createElement("li");

    item.className = "filme";

    if (filme.assistido) {
      item.classList.add("assistido");
    }

    const titulo = document.createElement("span");

    titulo.textContent = filme.titulo;
    titulo.className = "titulo-filme";

    const btnStatus = document.createElement("button");

    btnStatus.className = "btn-status";

    if (filme.assistido) {
      btnStatus.textContent = "Marcar como não assistido";
    } else {
      btnStatus.textContent = "Marcar como assistido";
    }

    btnStatus.addEventListener("click", function () {
      alternarAssistido(filme.id);
    });

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "btn-excluir";

    btnExcluir.addEventListener("click", function () {
      excluirFilme(filme.id);
    });

    item.appendChild(titulo);
    item.appendChild(btnStatus);
    item.appendChild(btnExcluir);

    listaFilmes.appendChild(item);
  });
}


btnAdicionar.addEventListener("click", adicionarFilme);


carregarFilmes();
renderizarFilmes();