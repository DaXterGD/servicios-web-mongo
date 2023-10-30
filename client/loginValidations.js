const $ = (element) => document.querySelector(element);

const $loginForm = $(".login");
const $loginButton = $(".login > button");

$loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = $("#username");
  const password = $("#password");
  const data = {
    username: username.value,
    password: password.value,
  };

  if (!data.username && !data.password) {
    username.classList.add("input-error");
    password.classList.add("input-error");
    $loginButton.textContent = "Debes ingresar tus credenciales";
    $loginButton.classList.add("error");
  } else if (!data.username) {
    username.classList.add("input-error");
    $loginButton.textContent = "Debes ingresar tu nombre de usuario";
    $loginButton.classList.add("error");
  } else if (!data.password) {
    password.classList.add("input-error");
    $loginButton.textContent = "Debes ingresar tu contraseña";
    $loginButton.classList.add("error");
  } else {
    username.classList.remove("input-error");
    password.classList.remove("input-error");
    $loginButton.classList.remove("error");
    $loginButton.classList.add("success");
    $loginButton.textContent = "Ingresando...";
  }

  setTimeout(() => {
    username.classList.remove("input-error");
    password.classList.remove("input-error");

    $loginButton.classList.remove("success");
    $loginButton.classList.remove("error");
    $loginButton.textContent = "Iniciar sesión";
  }, 2500);
});
