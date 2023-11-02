// importación de las funciones manejadoras de rutas
import * as users from './users.controller.mjs'

// definición de las rutas de la aplicación
export const router = (router) => {
  router.post('/signup', users.signUp)
  router.post('/login', users.logIn)
  router.get('/checkauth', users.checkAuth)
  router.get('/logout', users.logOut)
  router.get('/users', users.getUsers)
}
