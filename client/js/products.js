import { $ } from './utils.js'
import { checkAuth } from './checkAuth.js'
import { headerEvents } from './components/header.js'

const isLogged = await checkAuth()
const $productsGrid = $('.products')

if (isLogged) {
  const products = await fetch(
    'https://a-comernos-eso-api.onrender.com/products/'
  )
  let productsJSON = await products.json()
  productsJSON = productsJSON.createdProducts
  if (products.status === 500) {
    $productsGrid.insertAdjacentHTML(
      'afterbegin',
      '<h2 className="authError">Lo sentimos, ha ocurrido un error inesperado.</h2>'
    )
  } else {
    productsJSON.forEach((product) => {
      product.price = product.price.toLocaleString('es-ES')
      $productsGrid.insertAdjacentHTML(
        'beforeend',
        `
          <article class="product">
            <div class="product-img">
              <img src="${product.imageUrl}" alt="${product.name}">
            </div>
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <span class="product-category">${product.category}</span>
              <span class="product-price">$ ${product.price}</span>
              <button class="button go-to-details">Ver detalles</button>
            </div>
          </article>
        `
      )
    })
  }
} else {
  $productsGrid.insertAdjacentHTML(
    'afterbegin',
    '<h2 className="authError">Lo sentimos, inicia sesión para explorar nuestros productos.</h2>'
  )
}
