document.addEventListener("DOMContentLoaded", function () {
  const languageButtons = document.querySelectorAll(".language-switch button");
  let currentLanguage = "pt-BR"; // Idioma padrão

  const translations = {
    "pt-BR": {
      // Header
      home: "Início",
      newArrivals: "Novidades",
      collections: "Coleções",
      shop: "Carrinho",
      contact: "Contato",
      // Hero Section
      heroTitle: "Defina Seu Estilo. Redefina a Moda.",
      heroSubtitle:
        "Descubra uma curadoria exclusiva de peças internacionais, onde o design encontra a inovação.",
      exploreBtn: "Explorar Agora",
      // Featured Products
      featuredTitle: "Destaques da Temporada",
      featuredSubtitle:
        "Cortes ousados, texturas inovadoras e cores que marcam.",
      blazerTitle: "Blazer Urbano",
      blazerDesc: "Toque de audácia para seu dia a dia.",
      pantsTitle: "Calça Escultural",
      pantsDesc: "Conforto e forma em perfeita harmonia.",
      jacketTitle: "Jaqueta Minimalista",
      jacketDesc: "Versatilidade e elegância para qualquer ocasião.",
      viewDetails: "Ver Detalhes",
      // CTA Banner
      ctaBannerTitle: "Experiência Única de Compras",
      ctaBannerSubtitle:
        "Peças selecionadas a dedo para um guarda-roupa que inspira.",
      shopCollections: "Comprar Coleções",
    },
    "en-US": {
      // Header
      home: "Home",
      newArrivals: "New Arrivals",
      collections: "Collections",
      shop: "Cart",
      contact: "Contact",
      // Hero Section
      heroTitle: "Define Your Style. Redefine Fashion.",
      heroSubtitle:
        "Discover an exclusive curation of international pieces, where design meets innovation.",
      exploreBtn: "Explore Now",
      // Featured Products
      featuredTitle: "Season Highlights",
      featuredSubtitle: "Bold cuts, innovative textures, and striking colors.",
      blazerTitle: "Urban Blazer",
      blazerDesc: "A touch of audacity for your daily wear.",
      pantsTitle: "Sculptural Pants",
      pantsDesc: "Comfort and form in perfect harmony.",
      jacketTitle: "Minimalist Jacket",
      jacketDesc: "Versatility and elegance for any occasion.",
      viewDetails: "View Details",
      // CTA Banner
      ctaBannerTitle: "Unique Shopping Experience",
      ctaBannerSubtitle: "Hand-picked pieces for a wardrobe that inspires.",
      shopCollections: "Shop Collections",
    },
  };

  // Função para atualizar o conteúdo da página com o idioma selecionado
  function updateContent(lang) {
    const elementsToTranslate = document.querySelectorAll("[data-lang]");
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-lang");
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    // Note: Preços e outros conteúdos dinâmicos não são traduzidos por 'data-lang' aqui,
    // mas sim alterados via JavaScript se necessário, ou podem ser parte de um sistema de e-commerce real.
  }

  // Adicionar listeners de evento aos botões de idioma
  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover classe 'active' de todos os botões de idioma
      languageButtons.forEach((btn) => btn.classList.remove("active"));
      // Adicionar classe 'active' ao botão clicado
      this.classList.add("active");
      // Atualizar o idioma atual e o conteúdo
      currentLanguage = this.id;
      updateContent(currentLanguage);
    });
  });

  // Chamar a função de atualização na carga inicial para garantir o idioma padrão (PT-BR)
  updateContent(currentLanguage);
});

document.addEventListener("DOMContentLoaded", () => {
  const languageButtons = document.querySelectorAll(".language-switch button");
  const defaultLanguage = "pt-BR"; // Define a linguagem padrão
  let currentLanguage =
    localStorage.getItem("fireblend-lang") || defaultLanguage;

  // Objeto de tradução
  const translations = {
    "pt-BR": {
      // Header
      home: "Início",
      collections: "Coleções",
      Carrinho: "Carrinho", // Mantido como no HTML, ajuste se quiser mudar para 'Carrinho'
      contact: "Contato",

      // Index Page (Home)
      heroTitle: "Defina Seu Estilo. Redefina a Moda.",
      heroSubtitle:
        "Descubra uma curadoria exclusiva de peças internacionais, onde o design encontra a inovação.",
      exploreBtn: "Explorar Agora",
      featuredTitle: "Destaques da Temporada",
      featuredSubtitle:
        "Cortes ousados, texturas inovadoras e cores que marcam.",
      MoletomTitle: "Moletom Denim Tears",
      MoletomDesc: "Toque de audácia para seu dia a dia.",
      CamisetaTitle: "Camiseta Amiri Bar",
      pantsDesc: "Conforto e forma em perfeita harmonia.", // Isso é 'pantsDesc' mas para uma camiseta, talvez renomear no HTML para 'camisetaDesc'
      JaquetaTitle: "Jaqueta Palace Palamat",
      jacketDesc: "Versatilidade e elegância para qualquer ocasião.",
      viewDetails: "Ver Detalhes",
      ctaBannerTitle: "Experiência Única de Compras",
      ctaBannerSubtitle:
        "Peças selecionadas a dedo para um guarda-roupa que inspira.",
      shopCollections: "Comprar Coleções",

      // Collections Page
      collectionsTitle: "Nossas Coleções Exclusivas",
      collectionsSubtitle:
        "Descubra a curadoria de estilos que definem a Fire Blend.",
      collectionLouizVuittonTitle: "Coleção LouizVuitton ",
      collectionUrbanaDesc:
        "Peças modernas e funcionais para a vida na cidade.",
      collectionAmiriTitle: "Coleção Amiri",
      collectionAmiriDesc:
        "Luxo moderno, estilo rock e streetwear, alta qualidade e design ousado.",
      collectionAmiriTitle: "Coleção Amiri",
      collectionpalaceDesc:
        "Estampas vibrantes e designs que se destacam na multidão.",
      collectionPalaceTitle: "Coleção Palace",
      collectionNikeDesc: "Conforto e estilo inspirados nas ruas globais.",
      viewCollection: "Ver Coleção",
      ctaCollectionsTitle: "Encontre o Seu Próximo Favorito",
      ctaCollectionsSubtitle: "Cada peça, uma declaração de estilo.",
      viewAllProducts: "Ver Todos os Produtos",

      // Cart Page
      cartTitle: "Seu Carrinho de Compras",
      cartSubtitle: "Revise seus itens e finalize sua compra.",
      cartItem1Title: "Moletom Denim Tears",
      cartItem1Price: "Preço: R$",
      cartItem2Title: "Camiseta Amiri Bar",
      cartItem2Price: "Preço: R$",
      quantityLabel: "Quantidade:",
      removeItem: "Remover",
      cartSummaryTitle: "Resumo do Pedido",
      subtotal: "Subtotal:",
      shipping: "Frete:",
      shippingCost: "A calcular",
      total: "Total:",
      checkoutBtn: "Finalizar Compra",
      continueShopping: "Continuar Comprando",
      ctaCartTitle: "Sua Moda, Seu Estilo",
      ctaCartSubtitle: "Aproveite as últimas tendências com a Fire Blend.",
      exploreCollections: "Explorar Coleções",

      // Contact Page
      contactTitle: "Fale Conosco",
      contactSubtitle:
        "Estamos aqui para ajudar. Envie sua mensagem ou encontre-nos.",
      contactInfoTitle: "Informações de Contato",
      emailLabel: "Email:",
      phoneLabel: "Telefone:",
      addressLabel: "Endereço:",
      socialMediaConnect: "Conecte-se:",
      contactFormTitle: "Envie uma Mensagem",
      formName: "Nome Completo",
      formEmail: "Email",
      formSubject: "Assunto",
      formMessage: "Mensagem",
      formSubmit: "Enviar Mensagem",
      ctaContactTitle: "Sua Voz é Importante",
      ctaContactSubtitle: "Estamos sempre prontos para ouvir você.",
      backToHome: "Voltar ao Início",
    },
    "en-US": {
      // Header
      home: "Home",
      collections: "Collections",
      Carrinho: "Cart", // Renomeado para 'Cart'
      contact: "Contact",

      // Index Page (Home)
      heroTitle: "Define Your Style. Redefine Fashion.",
      heroSubtitle:
        "Discover an exclusive curation of international pieces, where design meets innovation.",
      exploreBtn: "Explore Now",
      featuredTitle: "Season Highlights",
      featuredSubtitle:
        "Bold cuts, innovative textures, and colors that make a statement.",
      MoletomTitle: "Denim Tears Sweatshirt",
      MoletomDesc: "A touch of audacity for your everyday.",
      CamisetaTitle: "Amiri Bar T-shirt",
      pantsDesc: "Comfort and form in perfect harmony.", // Sugestão: Renomear para 'tshirtDesc' no HTML
      JaquetaTitle: "Palace Palamat Jacket",
      jacketDesc: "Versatility and elegance for any occasion.",
      viewDetails: "View Details",
      ctaBannerTitle: "Unique Shopping Experience",
      ctaBannerSubtitle: "Hand-picked pieces for a wardrobe that inspires.",
      shopCollections: "Shop Collections",

      // Collections Page
      collectionsTitle: "Our Exclusive Collections",
      collectionsSubtitle:
        "Discover the curated styles that define Fire Blend.",
      collectionUrbanaTitle: "Louiz Vuitton Collection",
      collectionUrbanaDesc: "Modern and functional pieces for city life.",
      collectionAmiriTitle: "Amiri Collection",
      collectionAmiriDesc:
        "Modern luxury, rock and streetwear style, high quality and bold design.",
      collectionPalaceTitle: "Palace Collection",
      collectionPalaceDesc:
        "Vibrant prints and designs that stand out in the crowd.",
      collectionNikeTitle: "Nike Collection",
      collectionNikeDesc: "Comfort and style inspired by global streets.",
      viewCollection: "View Collection",
      ctaCollectionsTitle: "Find Your Next Favorite",
      ctaCollectionsSubtitle: "Every piece, a style statement.",
      viewAllProducts: "View All Products",

      // Cart Page
      cartTitle: "Your Shopping Cart",
      cartSubtitle: "Review your items and complete your purchase.",
      cartItem1Title: "Denim Tears Sweatshirt",
      cartItem1Price: "Price: R$", // Mantendo R$ pois é uma moeda brasileira
      cartItem2Title: "Amiri Bar T-shirt",
      cartItem2Price: "Price: R$", // Mantendo R$
      quantityLabel: "Quantity:",
      removeItem: "Remove",
      cartSummaryTitle: "Order Summary",
      subtotal: "Subtotal:",
      shipping: "Shipping:",
      shippingCost: "To be calculated",
      total: "Total:",
      checkoutBtn: "Checkout",
      continueShopping: "Continue Shopping",
      ctaCartTitle: "Your Fashion, Your Style",
      ctaCartSubtitle: "Enjoy the latest trends with Fire Blend.",
      exploreCollections: "Explore Collections",

      // Contact Page
      contactTitle: "Contact Us",
      contactSubtitle: "We are here to help. Send us a message or find us.",
      contactInfoTitle: "Contact Information",
      emailLabel: "Email:",
      phoneLabel: "Phone:",
      addressLabel: "Address:",
      socialMediaConnect: "Connect:",
      contactFormTitle: "Send a Message",
      formName: "Full Name",
      formEmail: "Email",
      formSubject: "Subject",
      formMessage: "Message",
      formSubmit: "Send Message",
      ctaContactTitle: "Your Voice Matters",
      ctaContactSubtitle: "We are always ready to hear from you.",
      backToHome: "Back to Home",
    },
  };

  // Função para aplicar a tradução
  const applyTranslation = (lang) => {
    document.querySelectorAll("[data-lang]").forEach((element) => {
      const key = element.getAttribute("data-lang");
      if (translations[lang] && translations[lang][key]) {
        // Para inputs com placeholder
        if (
          element.tagName === "INPUT" &&
          element.hasAttribute("placeholder")
        ) {
          element.setAttribute("placeholder", translations[lang][key]);
        }
        // Para textareas com placeholder
        else if (
          element.tagName === "TEXTAREA" &&
          element.hasAttribute("placeholder")
        ) {
          element.setAttribute("placeholder", translations[lang][key]);
        }
        // Para labels que precisam ter o texto traduzido
        else if (element.tagName === "LABEL") {
          // Se o label tem um input associado, o texto pode vir da tradução
          // Ou o label pode ser uma tradução direta para um span dentro dele
          element.textContent = translations[lang][key];
        }
        // Para imagens com alt text (caso queira traduzir o alt)
        else if (
          element.tagName === "IMG" &&
          element.hasAttribute("alt") &&
          translations[lang][key + "Alt"]
        ) {
          element.setAttribute("alt", translations[lang][key + "Alt"]);
        }
        // Caso contrário, use textContent
        else {
          element.textContent = translations[lang][key];
        }
      }
    });

    // Atualiza a classe 'active' nos botões de idioma
    languageButtons.forEach((button) => {
      if (button.id === lang) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    localStorage.setItem("fireblend-lang", lang); // Salva a preferência do usuário
  };

  // Event listeners para os botões de idioma
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentLanguage = button.id;
      applyTranslation(currentLanguage);
    });
  });

  // Aplica a tradução inicial ao carregar a página
  applyTranslation(currentLanguage);
});
