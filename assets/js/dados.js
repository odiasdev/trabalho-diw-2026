// Funções usadas por todas as páginas para ler e gravar os filmes

const CHAVE_FILMES = "cinelista-filmes";

const GENEROS = {
    acao: "Ação",
    animacao: "Animação",
    comedia: "Comédia",
    drama: "Drama",
    ficcao: "Ficção científica",
    terror: "Terror"
};

// Filmes de exemplo, usados só na primeira vez que o site é aberto
const FILMES_INICIAIS = [
    {
        id: 1,
        titulo: "Interestelar",
        diretor: "Christopher Nolan",
        genero: "ficcao",
        ano: 2014,
        duracao: 169,
        poster: "assets/img/interestelar.jpg",
        status: "assistido",
        nota: 9.5,
        dataAssistido: "2025-03-15",
        sinopse: "Um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade."
    },
    {
        id: 2,
        titulo: "Cidade de Deus",
        diretor: "Fernando Meirelles",
        genero: "drama",
        ano: 2002,
        duracao: 130,
        poster: "assets/img/cidade-de-deus.jpg",
        status: "assistido",
        nota: 9,
        dataAssistido: "2024-11-02",
        sinopse: "Buscapé cresce na Cidade de Deus, no Rio de Janeiro, e acompanha de perto o crescimento do crime na comunidade."
    },
    {
        id: 3,
        titulo: "Toy Story",
        diretor: "John Lasseter",
        genero: "animacao",
        ano: 1995,
        duracao: 81,
        poster: "assets/img/toy-story.jpg",
        status: "assistido",
        nota: 8.5,
        dataAssistido: "2024-06-20",
        sinopse: "Woody, o brinquedo favorito de Andy, sente ciúmes quando o garoto ganha o astronauta Buzz Lightyear."
    },
    {
        id: 4,
        titulo: "O Iluminado",
        diretor: "Stanley Kubrick",
        genero: "terror",
        ano: 1980,
        duracao: 146,
        poster: "assets/img/o-iluminado.jpg",
        status: "quero-ver",
        nota: null,
        dataAssistido: "",
        sinopse: "Jack Torrance aceita ser zelador de um hotel isolado durante o inverno, onde coisas estranhas começam a acontecer."
    }
];

function carregarFilmes() {
    const dados = localStorage.getItem(CHAVE_FILMES);

    // null = nunca salvou nada, então começa com os exemplos
    if (dados === null) {
        salvarFilmes(FILMES_INICIAIS);
        return FILMES_INICIAIS;
    }

    return JSON.parse(dados);
}

function salvarFilmes(filmes) {
    localStorage.setItem(CHAVE_FILMES, JSON.stringify(filmes));
}

function buscarFilmePorId(id) {
    const filmes = carregarFilmes();
    return filmes.find(function (filme) {
        return filme.id === id;
    });
}

function adicionarFilme(filme) {
    const filmes = carregarFilmes();
    filme.id = Date.now();
    filmes.push(filme);
    salvarFilmes(filmes);
}

function atualizarFilme(filmeAtualizado) {
    const filmes = carregarFilmes();

    for (let i = 0; i < filmes.length; i++) {
        if (filmes[i].id === filmeAtualizado.id) {
            filmes[i] = filmeAtualizado;
        }
    }

    salvarFilmes(filmes);
}

function excluirFilme(id) {
    const filmes = carregarFilmes().filter(function (filme) {
        return filme.id !== id;
    });
    salvarFilmes(filmes);
}

// Pega o "id" do endereço da página (ex.: detalhes.html?id=3)
function idDaUrl() {
    const parametros = new URLSearchParams(window.location.search);
    return Number(parametros.get("id"));
}

// Pôsteres locais precisam de "../" nas páginas que ficam dentro de pages/
function caminhoPoster(filme, prefixo) {
    if (!filme.poster) {
        return prefixo + "assets/img/sem-poster.svg";
    }
    if (filme.poster.startsWith("http")) {
        return filme.poster;
    }
    return prefixo + filme.poster;
}

function formatarNota(nota) {
    if (nota === null || nota === undefined) {
        return "-";
    }
    return String(nota).replace(".", ",");
}

function textoStatus(status) {
    return status === "assistido" ? "Assistido" : "Quero ver";
}
