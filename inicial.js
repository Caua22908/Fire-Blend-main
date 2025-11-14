/* função para criar bolinhas animadas na seção hero */
function criarBolinha() {
  const bolinha = document.createElement("div");
  bolinha.classList.add("bolinha");

  // Tamanho aleatório
  const tamanho = Math.random() * 20 + 15;
  bolinha.style.width = tamanho + "px";
  bolinha.style.height = tamanho + "px";

  // Seleciona a hero section
  const hero = document.querySelector(".hero-section");
  const heroRect = hero.getBoundingClientRect();

  // Posição aleatória dentro da hero section
  bolinha.style.left = Math.random() * (heroRect.width - tamanho) + "px";
  bolinha.style.top = Math.random() * (heroRect.height - tamanho) + "px";

  // Animação aleatória
  const duracao = Math.random() * 3 + 2;
  bolinha.style.animationDuration = duracao + "s";

  hero.appendChild(bolinha);

  // Remove após a animação
  setTimeout(() => {
    bolinha.remove();
  }, duracao * 1000);
}

// Inicia a criação de bolinhas quando a página estiver pronta
window.addEventListener("DOMContentLoaded", () => {
  setInterval(criarBolinha, 100);
});

/* função barra de navegação */

function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}

/*barra de pesquisa*/

const roupas = [
  "Moletom Denim Tears The Cotton Wreath",
  "Louis Vuitton LV Skate Sneaker Beige White",
  "Camiseta Louis Vuitton Ready to Wear",
  "Camiseta Louis Vuitton Ready to Wear",
  "Gorro Louis Vuitton Gray",
  "Jaqueta Louis Vuitton Monogram Flower",
  "Jaqueta Louis Vuitton Bomber Embroidered",
  "Bermuda Louis Vuitton Jeans Denim",
  "Cinto Louis Vuitton Monogram Preto",
  "Jaqueta Louis Vuitton Aviator Monogram",
  "Bermuda Jeans Louis Vuitton Carpenter",
  "Camiseta Louis Vuitton Jeans By Tyler",
  "Colete Jeans",
  "Mochila Louis Vuitton Christopher x Supreme",
  "Camisa Polo",
];

const input = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestionsBox");

function filterSuggestions(value) {
  if (!value) {
    suggestionsBox.classList.remove("active");
    suggestionsBox.innerHTML = "";
    return;
  }
  const filtered = roupas.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  if (filtered.length === 0) {
    suggestionsBox.classList.remove("active");
    suggestionsBox.innerHTML = "";
    return;
  }
  suggestionsBox.innerHTML = filtered
    .map((item) => `<div class="suggestion-item">${item}</div>`)
    .join("");
  suggestionsBox.classList.add("active");
}

input.addEventListener("input", () => {
  filterSuggestions(input.value);
});

suggestionsBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("suggestion-item")) {
    input.value = e.target.textContent;
    suggestionsBox.classList.remove("active");
  }
});

// Fecha sugestões ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    suggestionsBox.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const closeBtn = document.querySelector(".close");

  // Pega todos os botões "Ver Detalhes"
  const detailButtons = document.querySelectorAll(
    ".product-item .btn.secondary"
  );

  detailButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const product = btn.closest(".product-item");
      const img = product.querySelector("img").src;
      const title = product.querySelector("h3").innerText;
      const desc = product.querySelector("p").innerText;
      const price = product.querySelector(".price").innerText;

      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;

      modal.style.display = "block";
    });
  });

  // Fechar modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fecha clicando fora
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

/*sujestão de produtos*/

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const closeBtn = document.querySelector(".close");

  const detailButtons = document.querySelectorAll(
    ".product-item .btn.secondary"
  );

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const product = btn.closest(".product-item");
      const img = product.querySelector("img").src;
      const title = product.querySelector("h3").innerText;
      const desc = product.querySelector("p").innerText;
      const price = product.querySelector(".price").innerText;

      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;

      // Força a reanimação do preço sempre que abrir
      modalPrice.classList.remove("price-animate");
      void modalPrice.offsetWidth; // "hack" para resetar animação
      modalPrice.classList.add("price-animate");

      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const closeBtn = document.querySelector(".close");

  const detailButtons = document.querySelectorAll(
    ".product-item .btn.secondary"
  );onst tamanho = Math.random() * 20 + 15;
  bolinha.style.width = tamanho + "px";
  bolinha.style.height = tamanho + "px";


  detailButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const product = btn.closest(".product-item");
      const img = product.querySelector("img").src;
      const title = product.querySelector("h3").innerText;
      const desc = product.querySelector("p").innerText;
      const price = product.querySelector(".price").innerText;

      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;

      // Ativa a animação em loop
      modalPrice.classList.add("price-animate");

      modal.style.display = "block";
    });
  });

  // Fechar modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalPrice.classList.remove("price-animate"); // tira animação ao fechar
  });

  // Fecha clicando fora
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalPrice.classList.remove("price-animate");
    }
  });
});
