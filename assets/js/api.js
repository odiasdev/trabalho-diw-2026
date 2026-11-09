// Busca filmes na Studio Ghibli API e preenche o formulário de cadastro
// (usa a variável "form" e a função limparErros do cadastro.js)

const URL_API = "https://ghibliapi.vercel.app/films";

const formApi = document.querySelector("#form-api");
const campoBuscaApi = document.querySelector("#busca-api");
const statusApi = document.querySelector("#status-api");
const resultadosApi = document.querySelector("#resultados-api");

// Guarda a resposta da API para não precisar buscar de novo a cada pesquisa
let filmesGhibli = [];

async function buscarFilmesGhibli() {
    if (filmesGhibli.length === 0) {
        const resposta = await fetch(URL_API);
        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status);
        }
        filmesGhibli = await resposta.json();
    }
    return filmesGhibli;
}

function mostrarResultados(filmes) {
    resultadosApi.innerHTML = "";

    if (filmes.length === 0) {
        statusApi.textContent = "Nenhum filme encontrado na API.";
        return;
    }

    statusApi.textContent = filmes.length + " filme(s) encontrado(s). Clique em \"Usar\" para preencher o formulário.";

    for (const filme of filmes) {
        const item = document.createElement("li");
        item.innerHTML = `
            <img src="${filme.image}" alt="Pôster de ${filme.title}">
            <strong>${filme.title}</strong>
            <span>${filme.release_date} · ${filme.director}</span>
            <button type="button" class="secundario">Usar</button>
        `;

        item.querySelector("button").addEventListener("click", function () {
            usarFilmeDaApi(filme);
        });

        resultadosApi.appendChild(item);
    }
}

function usarFilmeDaApi(filme) {
    limparErros();

    form.titulo.value = filme.title;
    form.diretor.value = filme.director;
    form.genero.value = "animacao"; // todos os filmes do Ghibli são animações
    form.ano.value = filme.release_date;
    form.duracao.value = filme.running_time;
    form.poster.value = filme.image;
    form.sinopse.value = filme.description;

    statusApi.textContent = "Dados de \"" + filme.title + "\" preenchidos. Confira o formulário e clique em Salvar.";

    form.titulo.focus();
    form.scrollIntoView({ behavior: "smooth" });
}

formApi.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const termo = campoBuscaApi.value.trim().toLowerCase();
    statusApi.textContent = "Buscando...";
    resultadosApi.innerHTML = "";

    try {
        const filmes = await buscarFilmesGhibli();

        const encontrados = filmes.filter(function (filme) {
            return filme.title.toLowerCase().includes(termo) ||
                filme.original_title_romanised.toLowerCase().includes(termo);
        });

        mostrarResultados(encontrados);
    } catch (erro) {
        statusApi.textContent = "Não foi possível acessar a API. Verifique sua internet e tente novamente.";
    }
});
