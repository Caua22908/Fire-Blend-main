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
  const sideMenu = document.getElementById('sideMenu');

  if (loggedClient) {
    // Usuário está logado - mostra apenas botão Sair no header (desktop)
    let html = `
      <div class="header-auth-buttons" style="display:flex; gap:12px; align-items:center;">
    `;

    // Se for admin, adiciona botão admin
    if (loggedClient.role === 'admin') {
      html += `
        <a href="admin.html" class="admin-btn-header" style="
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
        <button id="logout-btn" class="logout-btn-header" style="
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

    // Adiciona botões no menu lateral (mobile)
    if (sideMenu) {
      // Remove o link de Login do menu lateral se existir
      const loginLink = sideMenu.querySelector('a[href="login.html"]');
      if (loginLink) {
        loginLink.remove();
      }

      // Adiciona botão Admin se for admin
      if (loggedClient.role === 'admin') {
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.textContent = 'Admin';
        adminLink.style.cssText = 'background:#ff7f00; color:#fff; font-weight:bold;';
        sideMenu.appendChild(adminLink);
      }

      // Adiciona botão Sair
      const logoutLink = document.createElement('a');
      logoutLink.href = '#';
      logoutLink.textContent = 'Sair';
      logoutLink.style.cssText = 'background:#f0f0f0; color:#333; font-weight:bold; cursor:pointer;';
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedClient');
        window.location.href = 'index.html';
      });
      sideMenu.appendChild(logoutLink);
    }
  } else {
    // Usuário não está logado
    loginContainer.innerHTML = '<a href="login.html" id="Login" class="active">Login</a>';
    
    // Garante que o link de Login está no menu lateral
    if (sideMenu) {
      const existingLoginLink = sideMenu.querySelector('a[href="login.html"]');
      if (!existingLoginLink) {
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.textContent = 'Login';
        sideMenu.appendChild(loginLink);
      }
    }
  }
});
