// Página de detalhes de um filme (detalhes.html?id=...)

const filme = buscarFilmePorId(idDaUrl());

// "2025-03-15" -> "15/03/2025"
function formatarData(data) {
    return data.split("-").reverse().join("/");
}

function mostrarDetalhes() {
    document.title = filme.titulo + " - CineLista";

    const poster = document.querySelector("#poster");
    poster.src = caminhoPoster(filme, "../");
    poster.alt = "Pôster do filme " + filme.titulo;

    document.querySelector("#titulo").textContent = filme.titulo;
    document.querySelector("#diretor").textContent = filme.diretor;
    document.querySelector("#genero").textContent = GENEROS[filme.genero];
    document.querySelector("#ano").textContent = filme.ano;
    document.querySelector("#duracao").textContent = filme.duracao ? filme.duracao + " minutos" : "-";
    document.querySelector("#nota").textContent = formatarNota(filme.nota);
    document.querySelector("#sinopse").textContent = filme.sinopse || "Sem sinopse cadastrada.";

    let status = textoStatus(filme.status);
    if (filme.status === "assistido" && filme.dataAssistido) {
        status += " em " + formatarData(filme.dataAssistido);
    }
    document.querySelector("#status").textContent = status;

    document.querySelector("#link-editar").href = "cadastro.html?id=" + filme.id;
}

function mostrarRelacionados() {
    const listaRelacionados = document.querySelector("#relacionados");

    const mesmoGenero = carregarFilmes().filter(function (outro) {
        return outro.genero === filme.genero && outro.id !== filme.id;
    });

    if (mesmoGenero.length === 0) {
        listaRelacionados.innerHTML = "<li>Nenhum outro filme deste gênero.</li>";
        return;
    }

    for (const outro of mesmoGenero) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "detalhes.html?id=" + outro.id;
        link.textContent = outro.titulo;
        item.appendChild(link);
        listaRelacionados.appendChild(item);
    }
}

if (filme) {
    mostrarDetalhes();
    mostrarRelacionados();

    document.querySelector("#botao-excluir").addEventListener("click", function () {
        if (confirm('Deseja excluir "' + filme.titulo + '"?')) {
            excluirFilme(filme.id);
            window.location.href = "../index.html?msg=excluido";
        }
    });
} else {
    // id inválido ou filme já excluído
    document.querySelector("#detalhes").innerHTML = `
        <section>
            <h2>Filme não encontrado</h2>
            <p>Esse filme não existe ou foi excluído.</p>
            <a href="../index.html" class="botao">Voltar para a lista</a>
        </section>
    `;
}
