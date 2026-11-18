
// array com os livros da loja
const livros = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Romance", preco: 29.9 },
  { id: 2, titulo: "Orgulho e Preconceito", autor: "Jane Austen", categoria: "Romance", preco: 34.5 },
  { id: 3, titulo: "O Hobbit", autor: "J. R. R. Tolkien", categoria: "Fantasia", preco: 42.0 },
  { id: 4, titulo: "Harry Potter e a Pedra Filosofal", autor: "J. K. Rowling", categoria: "Fantasia", preco: 39.9 },
  { id: 5, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", categoria: "Infantil", preco: 19.9 },
  { id: 6, titulo: "O Sítio do Picapau Amarelo", autor: "Monteiro Lobato", categoria: "Infantil", preco: 24.9 },
  { id: 7, titulo: "Código Limpo", autor: "Robert C. Martin", categoria: "Tecnologia", preco: 89.9 },
  { id: 8, titulo: "Aprendendo HTML e CSS", autor: "Equipe Folha Viva", categoria: "Tecnologia", preco: 49.9 }
];

// transforma número em dinheiro
function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}


// cria os cartões na tela a partir de uma lista de livros
function mostrarLivros(lista) {
  const area = document.getElementById("lista-livros");
  area.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const livro = lista[i];

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML =
      "<h3>" + livro.titulo + "</h3>" +
      "<p>Autor: " + livro.autor + "</p>" +
      "<p>Categoria: " + livro.categoria + "</p>" +
      "<p class='preco'>" + formatarPreco(livro.preco) + "</p>";

    area.appendChild(card);
  }

  // contador de itens mostrados e total de itens
  const contador = document.getElementById("contador");
  contador.textContent = "Mostrando " + lista.length + " de " + livros.length + " livros";
}

// filtra os livros pela categoria escolhida
function filtrarPorCategoria(categoria) {
  if (categoria === "todos") {
    mostrarLivros(livros);
  } else {
    const filtrados = livros.filter(function (livro) {
      return livro.categoria === categoria;
    });
    mostrarLivros(filtrados);
  }
}


if (document.getElementById("lista-livros")) {
  mostrarLivros(livros);

  const botoes = document.querySelectorAll(".filtro");
  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      filtrarPorCategoria(botao.dataset.categoria);
    });
  });
}

// SIMULADOR

// calcula o total aplicando a regra de desconto da livraria
function calcularTotal(preco, quantidade) {
  let desconto = 0;

  if (quantidade >= 5) {
    desconto = 0.2;
  } else if (quantidade >= 3) {
    desconto = 0.1;
  } else {
    desconto = 0;
  }

  const subtotal = preco * quantidade;
  const valorDesconto = subtotal * desconto;
  const total = subtotal - valorDesconto;

  return { subtotal: subtotal, desconto: desconto, valorDesconto: valorDesconto, total: total };
}


if (document.getElementById("form-simulador")) {
  const selectLivro = document.getElementById("livro");

  // coloca os livros do array dentro do select
  livros.forEach(function (livro) {
    const opcao = document.createElement("option");
    opcao.value = livro.id;
    opcao.textContent = livro.titulo + " - " + formatarPreco(livro.preco);
    selectLivro.appendChild(opcao);
  });

  document.getElementById("form-simulador").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const idEscolhido = Number(selectLivro.value);
    const quantidade = Number(document.getElementById("quantidade").value);
    const resultado = document.getElementById("resultado");

    if (quantidade < 1 || isNaN(quantidade)) {
      resultado.innerHTML = "<p class='erro'>Digite uma quantidade válida (1 ou mais).</p>";
      return;
    }

    const livro = livros.find(function (l) {
      return l.id === idEscolhido;
    });

    const conta = calcularTotal(livro.preco, quantidade);

    resultado.innerHTML =
      "<p>Livro: <strong>" + livro.titulo + "</strong></p>" +
      "<p>Quantidade: " + quantidade + "</p>" +
      "<p>Subtotal: " + formatarPreco(conta.subtotal) + "</p>" +
      "<p>Desconto: " + (conta.desconto * 100) + "% (- " + formatarPreco(conta.valorDesconto) + ")</p>" +
      "<p class='total'>Total: " + formatarPreco(conta.total) + "</p>";
  });
}

// CADASTRO
if (document.getElementById("form-cadastro")) {
  document.getElementById("form-cadastro").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const idade = Number(document.getElementById("idade").value);
    const genero = document.getElementById("genero").value;
    const saida = document.getElementById("mensagem-form");

    const erros = [];

    // regra 1: nome com pelo menos 3 letras
    if (nome.length < 3) {
      erros.push("O nome precisa ter pelo menos 3 letras.");
    }

    // regra 2: email precisa ter @ e ponto
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      erros.push("Digite um e-mail válido (com @ e .).");
    }

    // regra 3: senha com 6 caracteres ou mais
    if (senha.length < 6) {
      erros.push("A senha precisa ter pelo menos 6 caracteres.");
    }

    // regra 4: idade entre 10 e 120
    if (idade < 10 || idade > 120) {
      erros.push("A idade precisa estar entre 10 e 120 anos.");
    }

    // regra 5: escolher um gênero
    if (genero === "") {
      erros.push("Escolha o seu gênero favorito.");
    }

    if (erros.length > 0) {
      let html = "<ul class='erro'>";
      for (let i = 0; i < erros.length; i++) {
        html += "<li>" + erros[i] + "</li>";
      }
      html += "</ul>";
      saida.innerHTML = html;
    } else {
      saida.innerHTML = "<p class='sucesso'>Cadastro feito com sucesso! Bem-vindo(a), " + nome + "!</p>";
      document.getElementById("form-cadastro").reset();
    }
  });
}

//SOBRE E DÚVIDAa

// abre ou fecha a resposta da pergunta clicada
function alternarResposta(botao) {
  const resposta = botao.nextElementSibling;
  resposta.classList.toggle("aberta");
}

const perguntas = document.querySelectorAll(".pergunta");
perguntas.forEach(function (botao) {
  botao.addEventListener("click", function () {
    alternarResposta(botao);
  });
});
