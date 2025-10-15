// login.js (versão final)
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  const btn = document.querySelector(".login-btn");
  btn.innerText = "Entrando...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = "Entrar";
    btn.style.opacity = "1";
    btn.disabled = false;

    // Agora redireciona para a página principal
    window.location.href = "home.html"; // ou o nome da sua antiga index
  }, 1500);
});
