// header.js - Gerenciar login status no header
document.addEventListener('DOMContentLoaded', () => {
  // Procura pelo login-container dentro de um header (estrutura padrão do site)
  const header = document.querySelector('header');
  if (!header) return; // Se não houver header, não faz nada (páginas como login/register não têm)

  // Garante que o login-container está dentro do header e não é o container principal da página de login
  const loginContainer = header.querySelector('.login-container');
  if (!loginContainer || !header.contains(loginContainer)) return;
  
  // Verifica se estamos na página de login/register - se sim, não faz nada
  if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
    return;
  }

  const loggedClient = JSON.parse(localStorage.getItem('loggedClient') || 'null');

  if (loggedClient) {
    // Usuário está logado - mostra apenas botão Sair
    let html = `
      <div style="display:flex; gap:12px; align-items:center;">
    `;

    // Se for admin, adiciona botão admin
    if (loggedClient.role === 'admin') {
      html += `
        <a href="admin.html" style="
          padding:8px 12px;
          border-radius:6px;
          background:#ff7f00;
          color:#fff;
          text-decoration:none;
          font-weight:bold;
          font-size:13px;
        ">Admin</a>
      `;
    }

    html += `
        <button id="logout-btn" style="
          padding:8px 12px;
          border-radius:6px;
          background:#f0f0f0;
          border:1px solid #ddd;
          cursor:pointer;
          font-size:13px;
        ">Sair</button>
      </div>
    `;

    loginContainer.innerHTML = html;

    // Attach logout handler
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('loggedClient');
      window.location.href = 'index.html';
    });
  } else {
    // Usuário não está logado
    loginContainer.innerHTML = '<a href="login.html" id="Login" class="active">Login</a>';
  }
});
