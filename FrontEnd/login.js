const ApiLogin = "http://localhost:5678/api/users/login";

const form = document.getElementById("login-form");
const errorLogin = document.getElementById("error-Login");
const email = document.getElementById("login-email")
const password = document.getElementById("login-password")


document.getElementById("button-home").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});
document.getElementById("button-projets").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html#portfolio";
});
document.getElementById("button-contact").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html#contact";
});
document.getElementById("login-button").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "login.html";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
if(email===""){
  const error = document.getElementById("error-login");
  error.textContent = "Veuillez saisir votre email";
  error.classList.remove("hidden");
  return;
}
else if(password===""){
  const error = document.getElementById("error-login");
  error.textContent = "Veuillez saisir votre mot de passe";
  error.classList.remove("hidden");
  return;
}

  fetch(ApiLogin, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    })
    .catch((error) => {
      const err = document.getElementById("error-login");
      if (err) {
        err.textContent = error.message || "Connexion impossible.";
        err.classList.remove("hidden");
      } else {
        alert("Échec de la connexion. Vérifiez vos identifiants.");
      }
      console.error("Erreur lors de la connexion :", error);
  
    });
  });
