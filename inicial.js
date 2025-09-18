
function criarBolinha() {
    const bolinha = document.createElement('div');
    bolinha.classList.add('bolinha');

    // Tamanho aleatório
    const tamanho = Math.random() * 20 + 15;
    bolinha.style.width = tamanho + 'px';
    bolinha.style.height = tamanho + 'px';

    // Seleciona a hero section
    const hero = document.querySelector('.hero-section');
    const heroRect = hero.getBoundingClientRect();

    // Posição aleatória dentro da hero section
    bolinha.style.left = Math.random() * (heroRect.width - tamanho) + 'px';
    bolinha.style.top = Math.random() * (heroRect.height - tamanho) + 'px';

    // Animação aleatória
    const duracao = Math.random() * 3 + 2;
    bolinha.style.animationDuration = duracao + 's';

    hero.appendChild(bolinha);

    // Remove após a animação
    setTimeout(() => {
        bolinha.remove();
    }, duracao * 1000);
}

// Inicia a criação de bolinhas quando a página estiver pronta
window.addEventListener('DOMContentLoaded', () => {
    setInterval(criarBolinha, 100);
});
