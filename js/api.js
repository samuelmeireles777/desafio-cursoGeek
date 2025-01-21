export const apiLoja = {
  // Pega todos os produtos da API
  async produtoServer() {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error("Erro ao carregar produtos");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  },

  // Adiciona um novo produto à API
  async adicionarProduto(image, name, price) {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: image,
          name: name,
          price: price
        })
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar produto");
      }
      return await response.json(); // Retorna o produto recém-criado
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  },

  // Deleta um produto pela ID
  async deletarProduto(id) {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar produto");
      }
      return true; // Se a resposta for bem-sucedida
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      return false; // Retorna falso se houver erro
    }
  }
};




/* async function adicionarProduto(image,name,price){
  try{
   const adicionar = await fetch("http://localhost:3000/products", {
    method:"POST",
    headers:{
      "content-type": "application/json"
    },
    body: JSON.stringify({
      image:image,
      name:name,
      price:price,
    })

   })
   const formatoJson = await adicionar.json()
   return formatoJson
  }
  catch(erro){
  console.error("deu erro");
  }
}

export const apiLoja ={
   produtoServer,
   adicionarProduto,

}*/