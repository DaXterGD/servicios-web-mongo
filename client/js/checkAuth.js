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

  setTimeout(() => {
    $logOutError.textContent = "";
    $logOutButton.removeAttribute("disabled");
  }, 2000);
});
