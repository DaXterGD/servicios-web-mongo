import usersModel from './users.dao.mjs'

let isLogged = false
let user

export const signUp = async (req, res) => {
  user = {
    username: req.body.username,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    password: req.body.password
  }
  user.phone = parseInt(user.phone)

  try {
    const usernameExist = await usersModel.findOne({ username: user.username })
    const phoneExist = await usersModel.findOne({ phone: user.phone })
    if (usernameExist) {
      res.status(500).json({ message: 'Este usuario ya existe :(' })
    } else if (phoneExist) {
      res.status(500).json({ message: 'Este celular ya existe :(' })
    } else {
      await usersModel.create(user)
      res.status(200).json({ message: `¡Bienvenido, ${user.username}!` })
    }
  } catch (err) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado' })
  }
}

export const logIn = async (req, res) => {
  user = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    const usernameExist = await usersModel.findOne({ username: user.username })
    if (usernameExist) {
      if (usernameExist.password === user.password) {
        isLogged = true
        res.status(200).json({ message: `¡Bienvenido, ${user.username}!` })
      } else {
        res.status(500).json({ message: 'Contraseña incorrecta' })
      }
    } else {
      res.status(500).json({ message: 'Este usuario no existe' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado' })
  }
}

export const checkAuth = (req, res) => {
  if (isLogged) {
    res
      .status(200)
      .json({
        message: `¡Bienvenido, ${user.username}! Aún estamos construyendo el sitio, no hay mucho que ver por aquí`
      })
  } else {
    res.status(500).json({ message: 'No has iniciado sesión' })
  }
}

export const logOut = (req, res) => {
  if (isLogged) {
    isLogged = false
    res.status(200).json({ message: `¡Hasta luego, ${user.username}!` })
  } else {
    res.status(500).json({ message: 'No puedes cerrar sesión si no estás logueado' })
  }
}

export const getUsers = async (req, res) => {
  try {
    const createdUsers = await usersModel.find({})
    res.status(200).json({ createdUsers })
  } catch (err) {
    res.status(500).json({ error: 'There was an error.' })
  }
}
