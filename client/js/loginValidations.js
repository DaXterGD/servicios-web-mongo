const $ = (element) => document.querySelector(element);

// se obtiene del DOM el formulario y el botón para enviar la información de este
const $loginForm = $(".login");
const $loginButton = $(".login > button");

// cuando se envíen los datos del formulario, se ejecuta esta función qu contiene todas las validaciones
$loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $loginButton.setAttribute("disabled", "");

  const username = $("#username");
  const password = $("#password");
  const data = {
    username: username.value,
    password: password.value,
  };

  // validaciones de datos
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
  }
  // si todas las validaciones son correctas, entonces se enviarán los datos al servidor
  else {
    try {
      const response = await fetch(
        "https://a-comernos-eso-api.onrender.com/login",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseJSON = await response.json();

      if (response.status === 500) {
        $loginButton.textContent = `${responseJSON.message}`;
        $loginButton.classList.add("error");
      } else {
        $loginButton.textContent = `${responseJSON.message}`;
        $loginButton.classList.add("success");
        setTimeout(() => {
          // en caso de que el login sea exitoso, se redirecciona al usuario a la página de inicio
          location.pathname = "client/products.html";
        }, 1000);
      }
    } catch (error) {
      $loginButton.textContent = "Hubo un error, intenta más tarde";
      $loginButton.classList.add("error");
    }
  }

  // todos los mensajes que se muestren en el formulario se removerán luego de 2 segundos
  setTimeout(() => {
    username.classList.remove("input-error");
    password.classList.remove("input-error");

    $loginButton.classList.remove("success");
    $loginButton.classList.remove("error");

    $loginButton.textContent = "Iniciar sesión";
    $loginButton.removeAttribute("disabled");
  }, 2000);
});
