import { $ } from './utils.js'
import { checkAuth } from './checkAuth.js'
import { headerEvents } from './components/header.js'

// comprobación de la autenticación del usuario
const isLogged = await checkAuth()
const $productsGrid = $('.products')

// si el usuario está logueado, se mostrarán los productos existentes, de lo contrario de enviará un error
if (isLogged) {
  // petición al servidor de los prodcutos de la base de datos
  const products = await fetch(
    'https://a-comernos-eso-api.onrender.com/products/'
  )
  let productsJSON = await products.json()
  productsJSON = productsJSON.createdProducts

  // en caso de que no se hayan podido obtener los productos se mostrará un error
  if (products.status === 500) {
    $productsGrid.insertAdjacentHTML(
      'afterbegin',
      '<h2 className="authError">Lo sentimos, ha ocurrido un error inesperado.</h2>'
    )
  } else {
    // cuando se tengan todos los productos existentes, se recorren para insertar una tarjeta de prodcuto de cada uno
    productsJSON.forEach((product) => {
      // se formatea el precio del producto para añadirle el punto que separa los miles, ej: 50000 => 50.000
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
