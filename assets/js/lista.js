// Página inicial: mostra a lista de filmes

const lista = document.querySelector("#lista-filmes");
const contador = document.querySelector("#contador");
const vazio = document.querySelector("#vazio");
const mensagem = document.querySelector("#mensagem");

const formPesquisa = document.querySelector("#form-pesquisa");
const campoPesquisa = document.querySelector("#pesquisa");
const filtroGenero = document.querySelector("#filtro-genero");
const filtroStatus = document.querySelector("#filtro-status");

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
    mensagem.hidden = false;

    setTimeout(function () {
        mensagem.hidden = true;
    }, 4000);
}

function criarCard(filme) {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
        <img src="${caminhoPoster(filme, "")}" alt="Pôster de ${filme.titulo}">
        <h3>${filme.titulo}</h3>
        <p>${filme.diretor}, ${filme.ano}</p>
        <p>${GENEROS[filme.genero]} · ${textoStatus(filme.status)}</p>
        <p><strong>Nota: ${formatarNota(filme.nota)}</strong></p>
        <div class="acoes">
            <a href="pages/detalhes.html?id=${filme.id}" class="botao">Detalhes</a>
            <a href="pages/cadastro.html?id=${filme.id}" class="botao secundario">Editar</a>
            <button type="button" class="excluir">Excluir</button>
        </div>
    `;

    card.querySelector(".excluir").addEventListener("click", function () {
        confirmarExclusao(filme);
    });

    return card;
}

function confirmarExclusao(filme) {
    if (confirm('Deseja excluir "' + filme.titulo + '"?')) {
        excluirFilme(filme.id);
        mostrarFilmes();
        mostrarMensagem('"' + filme.titulo + '" foi excluído.');
    }
}

function filtrarFilmes(filmes) {
    const texto = campoPesquisa.value.trim().toLowerCase();
    const genero = filtroGenero.value;
    const status = filtroStatus.value;
    const resultado = [];

    for (const filme of filmes) {
        const achouTexto =
            filme.titulo.toLowerCase().includes(texto) ||
            filme.diretor.toLowerCase().includes(texto);

        // Valor "" significa "Todos"
        const achouGenero = genero === "" || filme.genero === genero;
        const achouStatus = status === "" || filme.status === status;

        if (achouTexto && achouGenero && achouStatus) {
            resultado.push(filme);
        }
    }

    return resultado;
}

function mostrarFilmes() {
    const todos = carregarFilmes();
    const filmes = filtrarFilmes(todos);

    lista.innerHTML = "";
    for (const filme of filmes) {
        lista.appendChild(criarCard(filme));
    }

    contador.textContent = "Mostrando " + filmes.length + " de " + todos.length + " filme(s)";

    if (todos.length === 0) {
        vazio.textContent = "Você ainda não cadastrou nenhum filme.";
        vazio.hidden = false;
    } else if (filmes.length === 0) {
        vazio.textContent = "Nenhum filme encontrado. Tente mudar a pesquisa ou os filtros.";
        vazio.hidden = false;
    } else {
        vazio.hidden = true;
    }
}

// A lista atualiza enquanto o usuário digita
campoPesquisa.addEventListener("input", mostrarFilmes);
filtroGenero.addEventListener("change", mostrarFilmes);
filtroStatus.addEventListener("change", mostrarFilmes);

formPesquisa.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mostrarFilmes();
});

// Outras páginas voltam pra cá com um aviso no endereço (ex.: index.html?msg=cadastrado)
const avisos = {
    cadastrado: "Filme cadastrado com sucesso!",
    editado: "Alterações salvas com sucesso!",
    excluido: "Filme excluído com sucesso."
};
const codigoAviso = new URLSearchParams(window.location.search).get("msg");
if (avisos[codigoAviso]) {
    mostrarMensagem(avisos[codigoAviso]);
}

mostrarFilmes();
