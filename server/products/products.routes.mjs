// importación de las funciones manejadoras de rutas
import * as products from './products.controller.mjs'

// definición de las rutas de la aplicación
export const router = (router) => {
  router.get('/', products.getProducts)
  router.post('/addproduct', products.addProduct)
}
