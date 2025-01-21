import { apiLoja } from './api.js';

const prateleira = document.querySelector("[data-prateleira]");
const formulario = document.querySelector("[data-Formulario]");
const LIMITE_PRODUTOS = 9; 


function novasMercadorias(image, name, price, id) {
  const produto = document.createElement("div");
  produto.className = "produtos__itens";
  produto.dataset.id = id;

  produto.innerHTML = `
    <img src="${image}" alt="Produto">
    <h3 class="fonte__itens">${name}</h3>
    <p>${price}</p>
    <button class="delete">🗑</button>
  `;

 
  produto.querySelector(".delete").addEventListener("click", () => {
    deletarProduto(id);  
  });

  return produto;
}


async function deletarProduto(id) {
  try {
    const sucesso = await apiLoja.deletarProduto(id);

    if (sucesso) {
      const produto = document.querySelector(`[data-id="${id}"]`);
      if (produto) {
        produto.remove();  
      }
    } else {
      alert("Falha ao deletar o produto. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    alert("Erro ao deletar o produto. Tente novamente.");
  }
}


async function produtosRecebidos() {
  try {
    const listaDeProdutos = await apiLoja.produtoServer();

    if (listaDeProdutos) {
     
      prateleira.innerHTML = '';

      
      const produtosLimitados = listaDeProdutos.slice(0, LIMITE_PRODUTOS);

      produtosLimitados.forEach(produto => {
        prateleira.appendChild(novasMercadorias(produto.image, produto.name, produto.price, produto.id));
      });

      
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


produtosRecebidos();


formulario.addEventListener("submit", adicionarProduto);




