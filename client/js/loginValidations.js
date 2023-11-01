const $ = (element) => document.querySelector(element);

const $loginForm = $(".login");
const $loginButton = $(".login > button");

$loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $loginButton.setAttribute("disabled", "");

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
    try {
      const response = await fetch("http://127.0.0.1:4000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJSON = await response.json();

      if (response.status === 500) {
        $loginButton.textContent = `${responseJSON.message}`;
        $loginButton.classList.add("error");
      } else {
        $loginButton.textContent = `${responseJSON.message}`;
        $loginButton.classList.add("success");
        setTimeout(() => {
          location.pathname = "client/products.html";
        }, 1000);
      }
    } catch (error) {
      $loginButton.textContent = "Hubo un error, intenta más tarde";
      $loginButton.classList.add("error");
    }
  }

  setTimeout(() => {
    username.classList.remove("input-error");
    password.classList.remove("input-error");

    $loginButton.classList.remove("success");
    $loginButton.classList.remove("error");

    $loginButton.textContent = "Iniciar sesión";
    $loginButton.removeAttribute("disabled");
  }, 2000);
});
