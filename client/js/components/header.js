import { $, $All } from '../utils.js'

const $navBar = $('.menu')
const $sticks = $All('.hamburger > span')

export const headerEvents = document.addEventListener('click', async (e) => {
  if (
    e.target.matches('.hamburger') ||
    e.target.matches(`.menu > *`) ||
    e.target.matches('.menu')
  ) {
    $navBar.classList.toggle('menu-active')
    $sticks.forEach((stick, i) =>
      stick.classList.toggle(`stick-${i + 1}-active`)
    )
  }

  if (e.target.matches('.button.login')) location.pathname = 'client/index.html'
  if (e.target.matches('.button.sign-up')) location.pathname = 'client/sign-up.html'
  if (e.target.matches('.button.logout')) {
    const $logoutButton = $('.button.logout')
    $logoutButton.setAttribute('disabled', '')

    const response = await fetch(
      'https://a-comernos-eso-api.onrender.com/logout'
    )

    if (response.status === 500) {
      $logoutButton.textContent = 'Ocurrió un error'
      $logoutButton.classList.add('error')
    } else {
      location.pathname = 'client/index.html'
    }

    // si se mostró en pantalla un mensaje de error, este se removerá luego de 2 segundos
    setTimeout(() => {
      $logoutButton.textContent = 'Cerrar sesión'
      $logoutButton.classList.remove('error')
      $logoutButton.removeAttribute('disabled')
    }, 2000)
  }
})
