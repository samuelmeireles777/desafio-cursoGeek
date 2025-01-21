export const apiLoja = {
 
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
      return await response.json();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  },


  async deletarProduto(id) {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar produto");
      }
      return true; 
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      return false; 
    }
  }
};



