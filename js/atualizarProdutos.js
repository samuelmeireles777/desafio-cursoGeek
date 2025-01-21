import { apiLoja } from './api.js';

const prateleira = document.querySelector("[data-prateleira]");
const formulario = document.querySelector("[data-Formulario]");
const LIMITE_PRODUTOS = 9; // Definindo limite de produtos a exibir

// Função para adicionar o produto à página
function novasMercadorias(image, name, price, id) {
  const produto = document.createElement("div");
  produto.className = "produtos__itens";
  produto.dataset.id = id;  // Atribui o ID para poder deletar depois

  produto.innerHTML = `
    <img src="${image}" alt="Produto">
    <h3 class="fonte__itens">${name}</h3>
    <p>${price}</p>
    <button class="delete">🗑</button>
  `;

  // Adiciona o evento para deletar o produto
  produto.querySelector(".delete").addEventListener("click", () => {
    deletarProduto(id);  // Chama a função de deletar
  });

  return produto;
}

// Função para deletar o produto da página e da API
async function deletarProduto(id) {
  try {
    const sucesso = await apiLoja.deletarProduto(id);

    if (sucesso) {
      const produto = document.querySelector(`[data-id="${id}"]`);
      if (produto) {
        produto.remove();  // Remove o produto da página
      }
    } else {
      alert("Falha ao deletar o produto. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    alert("Erro ao deletar o produto. Tente novamente.");
  }
}

// Função para carregar os produtos da API e mostrar na página
async function produtosRecebidos() {
  try {
    const listaDeProdutos = await apiLoja.produtoServer();

    if (listaDeProdutos) {
      // Limpa a prateleira antes de adicionar novos produtos
      prateleira.innerHTML = '';

      // Limita o número de produtos exibidos
      const produtosLimitados = listaDeProdutos.slice(0, LIMITE_PRODUTOS);

      produtosLimitados.forEach(produto => {
        prateleira.appendChild(novasMercadorias(produto.image, produto.name, produto.price, produto.id));
      });

      // Caso haja mais produtos que o limite, podemos avisar
      if (listaDeProdutos.length > LIMITE_PRODUTOS) {
        alert("Limite de produtos exibidos atingido.");
      }
    } else {
      alert("Nenhum produto encontrado.");
    }
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Erro ao carregar produtos. Tente novamente.");
  }
}

// Função para adicionar produto através do formulário
async function adicionarProduto(evento) {
  evento.preventDefault();

  const imagem = document.querySelector("[data-Imagem]").value;
  const nome = document.querySelector("[data-Nome]").value;
  const preco = document.querySelector("[data-preco]").value;

  try {
    const novoProduto = await apiLoja.adicionarProduto(imagem, nome, preco);

    if (novoProduto) {
      prateleira.appendChild(novasMercadorias(novoProduto.image, novoProduto.name, novoProduto.price, novoProduto.id));
    } else {
      alert("Falha ao adicionar o produto. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    alert("Erro ao adicionar o produto. Tente novamente.");
  }
}

// Carrega os produtos quando a página é carregada
produtosRecebidos();

// Adiciona o evento para o formulário de adicionar produto
formulario.addEventListener("submit", adicionarProduto);



/*const prateleira =document.querySelector("[data-prateleira]")
const formulario = document.querySelector("[data-Formulario]");


function novasMercadorias(image, name, price){
    const produto = document.createElement("div");
    produto.className ="produtos__itens";

    produto.innerHTML=`<img src="${image}" alt="Produto">
                        <h3 class="fonte__itens" >${name}</h3>
                        <p>${price}</p>`
     return produto;
    
}


async function produtosRecebidos() {
    const listaDeProdutos = await apiLoja.produtoServer();
    listaDeProdutos.forEach(Elemento=>prateleira.appendChild(novasMercadorias(Elemento.image, Elemento.name,Elemento.price)));
}

produtosRecebidos

async function CriarProdutos(evento){
    evento.preventDefault();

   const imagem  =document.querySelector("[data-Imagem]").value;
   const nome =document.querySelector("[data-Nome]").value;
   const preco =document.querySelector("[data-preco]").value;

   await apiLoja.adicionarProduto(imagem,nome,preco);
}

formulario.addEventListener("submit", evento=>CriarProdutos(evento))*/


