// Página inicial: mostra a lista de filmes

const lista = document.querySelector("#lista-filmes");
const contador = document.querySelector("#contador");
const vazio = document.querySelector("#vazio");

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

    return card;
}

function mostrarFilmes() {
    const filmes = carregarFilmes();

    lista.innerHTML = "";
    for (const filme of filmes) {
        lista.appendChild(criarCard(filme));
    }

    contador.textContent = filmes.length + " filme(s) cadastrado(s)";

    if (filmes.length === 0) {
        vazio.textContent = "Você ainda não cadastrou nenhum filme.";
        vazio.hidden = false;
    } else {
        vazio.hidden = true;
    }
}

mostrarFilmes();
