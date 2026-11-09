// Página de cadastro

const form = document.querySelector("#form-filme");
const feedback = document.querySelector("#feedback");

// Se o endereço tiver ?id=..., a página funciona como edição
const filmeEditado = buscarFilmePorId(idDaUrl());

function preencherFormulario(filme) {
    form.titulo.value = filme.titulo;
    form.diretor.value = filme.diretor;
    form.genero.value = filme.genero;
    form.ano.value = filme.ano;
    form.duracao.value = filme.duracao || "";
    form.status.value = filme.status;
    form.nota.value = filme.nota === null ? "" : filme.nota;
    form["data-assistido"].value = filme.dataAssistido;
    form.sinopse.value = filme.sinopse;

    // Pôsteres da pasta img não são URL, então só mostra os da internet
    if (filme.poster.startsWith("http")) {
        form.poster.value = filme.poster;
    }
}

if (filmeEditado) {
    document.title = "Editar Filme - CineLista";
    document.querySelector("#titulo-pagina").textContent = "Editar filme";
    document.querySelector("#botao-salvar").textContent = "Salvar alterações";
    preencherFormulario(filmeEditado);
}

function lerFormulario() {
    const filme = {
        titulo: form.titulo.value.trim(),
        diretor: form.diretor.value.trim(),
        genero: form.genero.value,
        ano: Number(form.ano.value),
        duracao: form.duracao.value === "" ? null : Number(form.duracao.value),
        poster: form.poster.value.trim(),
        status: form.status.value,
        nota: form.nota.value === "" ? null : Number(form.nota.value),
        dataAssistido: form["data-assistido"].value,
        sinopse: form.sinopse.value.trim()
    };

    // Filme que ainda não foi visto não tem nota nem data
    if (filme.status === "quero-ver") {
        filme.nota = null;
        filme.dataAssistido = "";
    }

    return filme;
}

// Devolve um objeto { idDoCampo: "mensagem de erro" }
function validar(filme) {
    const erros = {};
    const anoMaximo = new Date().getFullYear() + 5;

    if (filme.titulo === "") {
        erros.titulo = "Informe o título do filme.";
    }
    if (filme.diretor === "") {
        erros.diretor = "Informe o diretor.";
    }
    if (filme.genero === "") {
        erros.genero = "Escolha um gênero.";
    }
    if (!filme.ano) {
        erros.ano = "Informe o ano de lançamento.";
    } else if (filme.ano < 1888 || filme.ano > anoMaximo) {
        erros.ano = "O ano deve estar entre 1888 e " + anoMaximo + ".";
    }
    if (filme.duracao !== null && filme.duracao <= 0) {
        erros.duracao = "A duração deve ser maior que zero.";
    }
    if (filme.poster !== "" && !filme.poster.startsWith("http")) {
        erros.poster = "O endereço deve começar com http:// ou https://";
    }
    if (filme.nota !== null && (filme.nota < 0 || filme.nota > 10)) {
        erros.nota = "A nota deve ser de 0 a 10.";
    }

    return erros;
}

function limparErros() {
    document.querySelectorAll(".erro").forEach(function (aviso) {
        aviso.remove();
    });
    document.querySelectorAll(".invalido").forEach(function (campo) {
        campo.classList.remove("invalido");
    });
    feedback.hidden = true;
}

function mostrarErros(erros) {
    for (const id in erros) {
        const campo = document.querySelector("#" + id);
        campo.classList.add("invalido");

        const aviso = document.createElement("small");
        aviso.className = "erro";
        aviso.textContent = erros[id];
        campo.after(aviso);
    }

    feedback.textContent = "Corrija os campos destacados em vermelho.";
    feedback.hidden = false;

    // Leva o usuário até o primeiro campo com erro
    document.querySelector(".invalido").focus();
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparErros();

    const filme = lerFormulario();
    const erros = validar(filme);

    if (Object.keys(erros).length > 0) {
        mostrarErros(erros);
        return;
    }

    if (filmeEditado) {
        filme.id = filmeEditado.id;

        // Campo do pôster vazio = mantém o pôster que já tinha
        if (filme.poster === "") {
            filme.poster = filmeEditado.poster;
        }

        atualizarFilme(filme);
        window.location.href = "../index.html?msg=editado";
    } else {
        adicionarFilme(filme);
        window.location.href = "../index.html?msg=cadastrado";
    }
});

form.addEventListener("reset", limparErros);
