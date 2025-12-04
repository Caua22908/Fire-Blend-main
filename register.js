// register.js
async function handleRegister(e) {
  if (e && e.preventDefault) e.preventDefault();
  console.debug('handleRegister called');

  const nome = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!nome || !email || !senha || !confirmPassword) {
    alert("Preencha todos os campos!");
    return;
  }
  if (senha !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um endereço de e-mail válido.");
    return;
  }

  const btn = document.querySelector(".login-btn");
  btn.innerText = "Cadastrando...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  try {
    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, telefone: '', endereco: '', cpf: '', email, senha })
    });
    if (!res.ok) {
      // tenta ler JSON; se falhar, lê texto; protege contra respostas vazias
      let errText = 'Erro ao cadastrar';
      try {
        const errObj = await res.json();
        errText = errObj.error || JSON.stringify(errObj) || errText;
      } catch (e) {
        try {
          const t = await res.text();
          errText = t || errText;
        } catch (_) {
          errText = res.statusText || errText;
        }
      }
      throw new Error(errText);
    }
    let created;
    try {
      created = await res.json();
    } catch (e) {
      // resposta vazia ou não-JSON; criar objeto mínimo
      created = { id_cliente: null, nome, email };
    }
    // Salva usuário logado no localStorage (simples)
    localStorage.setItem('loggedClient', JSON.stringify(created));
    alert('Cadastro realizado com sucesso! Você já está logado.');
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Erro no cadastro:', err);
    alert('Erro no cadastro: ' + (err.message || err));
  } finally {
    btn.innerText = 'Cadastrar';
    btn.style.opacity = '1';
    btn.disabled = false;
  }
}

// Attach handlers: submit (defensive) and button click
const form = document.getElementById('registerForm');
if (form) form.addEventListener('submit', handleRegister);
const btn = document.getElementById('registerBtn');
if (btn) btn.addEventListener('click', handleRegister);