import * as users from './users.controller.mjs'

export const router = (router) => {
  router.post('/signup', users.signUp)
  router.post('/login', users.logIn)
  router.get('/checkauth', users.checkAuth)
  router.get('/logout', users.logOut)
  router.get('/users', users.getUsers)
}
