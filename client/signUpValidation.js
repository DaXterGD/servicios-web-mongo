const $ = (element) => document.querySelector(element);

const validateUserName = /^[a-zA-Zñ][a-zA-Zñ0-9]{4,49}$/;
const validatePhone = /^\d{10}$/;
const validatePassword = /^(?=.*\d)[a-zA-Zñ0-9-_.\*¿?$#%&]{10,100}$/;

const $signUpForm = $(".sign-up");
const $signUpButton = $(".sign-up > button");

$signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = $("#username");
  const phone = $("#phone");
  const dateOfBirth = $("#date-of-birth");
  const password = $("#password");
  const confirmPassword = $("#confirm-password");
  const data = {
    username: username.value,
    phone: phone.value,
    dateOfBirth: dateOfBirth.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  if (
    !data.username &&
    !data.phone &&
    !data.dateOfBirth &&
    !data.password &&
    !data.confirmPassword
  ) {
    username.classList.add("input-error");
    phone.classList.add("input-error");
    dateOfBirth.classList.add("input-error");
    password.classList.add("input-error");
    confirmPassword.classList.add("input-error");

    $signUpButton.textContent = "Debes ingresar tus datos";
    $signUpButton.classList.add("error");
  } else if (!data.username) {
    username.classList.add("input-error");

    $signUpButton.textContent = "Debes ingresar tu nombre de usuario";
    $signUpButton.classList.add("error");
  } else if (!validateUserName.test(data.username)) {
    username.classList.add("input-error");

    $signUpButton.textContent = "Debe comenzar con una letra, min. 5 carac.";
    $signUpButton.classList.add("error");
  } else if (!data.phone) {
    phone.classList.add("input-error");

    $signUpButton.textContent = "Debes ingresar tu número de teléfono";
    $signUpButton.classList.add("error");
  } else if (!validatePhone.test(data.phone)) {
    phone.classList.add("input-error");

    $signUpButton.textContent = "Debe tener 10 dígitos";
    $signUpButton.classList.add("error");
  } else if (!data.dateOfBirth) {
    dateOfBirth.classList.add("input-error");

    $signUpButton.textContent = "Debes ingresar tu fecha de nacimiento";
    $signUpButton.classList.add("error");
  } else if (!data.password) {
    password.classList.add("input-error");

    $signUpButton.textContent = "Debes ingresar tu contraseña";
    $signUpButton.classList.add("error");
  } else if (!validatePassword.test(data.password)) {
    password.classList.add("input-error");

    $signUpButton.textContent = "Debe tener al menos un número, min. 10 carac.";
    $signUpButton.classList.add("error");
  } else if (!data.confirmPassword) {
    confirmPassword.classList.add("input-error");

    $signUpButton.textContent = "Confirma tu contraseña";
    $signUpButton.classList.add("error");
  } else if (data.password !== data.confirmPassword) {
    confirmPassword.classList.add("input-error");

    $signUpButton.textContent = "Las contraseñas no coinciden";
    $signUpButton.classList.add("error");
  } else {
    username.classList.remove("input-error");
    phone.classList.remove("input-error");
    dateOfBirth.classList.remove("input-error");
    password.classList.remove("input-error");
    confirmPassword.classList.remove("input-error");

    $signUpButton.classList.remove("error");
    $signUpButton.classList.add("success");
    $signUpButton.textContent = "Completando...";

    setTimeout(async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/api/add", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 500) {
          $signUpButton.textContent = "Este usuario ya existe :(";

          $signUpButton.classList.remove("success");
          $signUpButton.classList.add("error");
        } else {
          $signUpButton.textContent = "¡Bienvenido!";
          setTimeout(() => {
            location.pathname = "client/login.html";
          }, 2000);
        }
      } catch (err) {
        $signUpButton.textContent = "Hubo un error, intente más tarde";

        $signUpButton.classList.remove("success");
        $signUpButton.classList.add("error");
      }
    }, 1000);
  }

  setTimeout(() => {
    username.classList.remove("input-error");
    phone.classList.remove("input-error");
    dateOfBirth.classList.remove("input-error");
    password.classList.remove("input-error");
    confirmPassword.classList.remove("input-error");

    $signUpButton.classList.remove("success");
    $signUpButton.classList.remove("error");

    $signUpButton.textContent = "Completar registro";
  }, 2500);
});
