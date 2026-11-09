# CineLista

Catálogo pessoal de filmes desenvolvido para a disciplina de DIW.

## Etapa 1 - HTML e Estrutura da Interface

Estrutura da interface usando HTML semântico. As funcionalidades ainda não estão
implementadas em JavaScript e os dados são fictícios.

- **Início (`index.html`)**: pesquisa, filtros, ordenação e listagem dos filmes
- **Cadastro (`pages/cadastro.html`)**: formulário de cadastro/edição
- **Detalhes (`pages/detalhes.html`)**: informações completas de um filme
- **Sobre (`pages/sobre.html`)**: descrição do sistema

## Etapa 2 - CSS, Layout e Responsividade

- Cores e fonte definidas em variáveis no `style.css`
- Cabeçalho, menu e botões organizados com Flexbox
- Formulário, pesquisa, listagem em cards e detalhes organizados com Grid
- Estados de hover e foco nos links, botões e campos
- Responsividade com dois breakpoints: 900px (tablet) e 600px (celular)

Os pôsteres dos filmes foram retirados da Wikipedia.

## Etapa 3 - JavaScript, Dados e Interatividade

- Cadastro com validação dos campos e mensagens de erro/sucesso
- Listagem gerada pelo JavaScript a partir dos dados salvos
- Página de detalhes (`detalhes.html?id=...`) com filmes do mesmo gênero
- Edição (`cadastro.html?id=...`) e exclusão com confirmação
- Pesquisa por título ou diretor, filtros por gênero e status e ordenação por título, ano ou nota
- Dados salvos no **localStorage** (na primeira visita são carregados 4 filmes de exemplo)
- Integração com a [Studio Ghibli API](https://ghibliapi.vercel.app): na página de cadastro dá para
  buscar um filme do estúdio e usar os dados dele (título, diretor, ano, duração, pôster e sinopse)
  para preencher o formulário

## Estrutura

```
index.html
pages/
  cadastro.html, detalhes.html, sobre.html
assets/
  css/style.css
  js/
    dados.js      -> funções do localStorage (usado em todas as páginas)
    lista.js      -> listagem, pesquisa, filtros, ordenação e exclusão
    cadastro.js   -> cadastro, edição e validação
    api.js        -> busca na Studio Ghibli API
    detalhes.js   -> página de detalhes
  img/
```
