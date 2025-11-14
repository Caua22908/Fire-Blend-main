// register.js
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  // 1. Validação simples de preenchimento
  if (!name || !email || !password || !confirmPassword) {
    alert("Preencha todos os campos!");
    return;
  }

  // 2. Validação da senha
  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  
  // 3. Validação de formato de e-mail (opcional, mas bom)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um endereço de e-mail válido.");
    return;
  }

  // Simulação de processamento
  const btn = document.querySelector(".login-btn");
  btn.innerText = "Cadastrando...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  setTimeout(() => {
    // Simula a resposta do servidor: sucesso!
    alert(`Cadastro de ${name} realizado com sucesso! Use seu e-mail (${email}) para fazer login.`);
    
    // Volta o botão ao estado normal
    btn.innerText = "Cadastrar";
    btn.style.opacity = "1";
    btn.disabled = false;

    // Redireciona para a página de login após o cadastro
    window.location.href = "login.html"; 
  }, 2000);
});