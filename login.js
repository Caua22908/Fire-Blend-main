// login.js (versão final)
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const btn = document.querySelector(".login-btn");
  btn.innerText = "Entrando...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (!res.ok) {
      // tenta ler JSON, se não for possível lê texto e fornece mensagem legível
      let errText = 'Falha ao autenticar';
      try {
        const errObj = await res.json();
        errText = errObj.error || errObj.message || JSON.stringify(errObj) || errText;
      } catch (e) {
        try { errText = await res.text() || errText; } catch (_) { errText = res.statusText || errText; }
      }
      throw new Error(errText);
    }

    let cliente;
    try {
      cliente = await res.json();
    } catch (e) {
      // resposta vazia ou não-JSON
      cliente = null;
    }

    if (!cliente) {
      // sucesso sem corpo JSON — não ideal, mas tratar
      alert('Login efetuado (sem dados retornados).');
      window.location.href = 'index.html';
      return;
    }

    localStorage.setItem('loggedClient', JSON.stringify(cliente));
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Erro ao autenticar:', err);
    alert('Erro ao entrar: ' + (err.message || err));
  } finally {
    btn.innerText = 'Entrar';
    btn.style.opacity = '1';
    btn.disabled = false;
  }
});
