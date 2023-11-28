import { $ } from './utils.js'

// cuando se haya cargado esta página, se ejecuta esta función que comprueba la autenticación del usuario, dependiendo de la respuesta del servidor se mostrará un mensaje u otro
export const checkAuth = async () => {
  const response = await fetch(
    'https://a-comernos-eso-api.onrender.com/checkauth'
  )

  const $headerMenu = $('.header .menu')

  if (response.status === 500) {
    $headerMenu.insertAdjacentHTML(
      'beforeend',
      `
        <button class="button sign-up">Regístrate</button>
        <button class="button login">Inicia sesión</button>
      `
    )
    return false
  } else {
    $headerMenu.insertAdjacentHTML(
      'beforeend',
      `<button class="button logout">Cerrar sesión</button>`
    )
    return true
  }
}