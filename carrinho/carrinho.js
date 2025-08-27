function atualizarBadgeCarrinho() {
  let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  let badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = carrinho.length; // número de itens
    badge.style.display = carrinho.length > 0 ? "inline-block" : "none"; // esconde se vazio
  }
}

// Chame sempre que adicionar item
function adicionarAoCarrinho(nome, preco, imagem) {
  let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco, imagem });
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarBadgeCarrinho(); // atualiza contador
  alert(`${nome} foi adicionado ao carrinho!`);
}

// Chame também no carrinho ao remover
function removerItem(index) {
  let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
  atualizarBadgeCarrinho();
}

// Quando a página carregar, já atualiza
document.addEventListener("DOMContentLoaded", atualizarBadgeCarrinho);
