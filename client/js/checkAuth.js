// cuando se haya cargado esta página, se ejecuta esta función que comprueba la autenticación del usuario, dependiendo de la respuesta del servidor se mostrará un mensaje u otro
addEventListener("DOMContentLoaded", async (e) => {
  const response = await fetch("https://a-comernos-eso-api.onrender.com/checkauth");
  const responseJSON = await response.json();

  if (response.status === 500) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<h1 style="color: red">${responseJSON.message}</h1>`
    );
  } else {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<h1>${responseJSON.message}</h1>`
    );
  }
});

const $logOutButton = document.querySelector(".log-out");

// esta función se ejecuta cuando el usuario presione el botón para cerrar sesión, si el usuario no se encuentra logueado, se mostrará un error en pantalla, caso contrario, se redirecciona al usuario a la página de login
$logOutButton.addEventListener("click", async () => {
  $logOutButton.setAttribute("disabled", "");

  const response = await fetch("https://a-comernos-eso-api.onrender.com/logout");
  const responseJSON = await response.json();
  let $logOutError;

  if (response.status === 500) {
    $logOutError = document.querySelector(".log-out-error");
    $logOutError.style.setProperty("color", "red");
    $logOutError.textContent = responseJSON.message;
  } else {
    location.pathname = "client/index.html";
  }

  // si se mostró en pantalla un mensaje de error, este se removerá luego de 2 segundos
  setTimeout(() => {
    $logOutError.textContent = "";
    $logOutButton.removeAttribute("disabled");
  }, 2000);
});
