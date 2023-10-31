import * as users from './users.controller.mjs'

export const router = (router) => {
  router.post('/signup', users.createUser)
  router.post('/login', users.authUser)
  router.get('/productos', users.showProducts)
  router.get('/users', users.getUsers)
}
