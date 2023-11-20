import bcrypt from 'bcryptjs'
import UsersModel from './users.dao.mjs'

// variable que mantiene el estado de si el usuario se encuentra logueado en la aplicación
let isLogged = false
// variable que almacena los datos del usuario para manejarlos cuando este desea registrarse o iniciar sesión
let user

// función manejadora de registro de usuarios
export const signUp = async (req, res) => {
  user = {
    username: req.body.username,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    password: req.body.password
  }
  user.phone = parseInt(user.phone)

  try {
    const usernameExist = await UsersModel.findOne({ username: user.username })
    const phoneExist = await UsersModel.findOne({ phone: user.phone })
    if (usernameExist) {
      res.status(500).json({ message: 'Este usuario ya existe :(' })
    } else if (phoneExist) {
      res.status(500).json({ message: 'Este celular ya existe :(' })
    } else {
      const newUser = new UsersModel({ ...user })
      newUser.password = await newUser.encryptPassword(user.password)
      await UsersModel.create(newUser)
      res.status(200).json({ message: `¡Bienvenido, ${user.username}!` })
    }
  } catch (err) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado' })
  }
}

// función manejadora de inicio de sesión
export const logIn = async (req, res) => {
  user = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    const userExist = await UsersModel.findOne({ username: user.username })
    if (userExist) {
      bcrypt.compare(user.password, userExist.password, (err, match) => {
        if (err) {
          res.status(500).json({ message: 'Ha ocurrido un error inesperado' })
        } if (match) {
          isLogged = true
          res.status(200).json({ message: `¡Bienvenido, ${user.username}!` })
        } else {
          res.status(500).json({ message: 'Contraseña incorrecta' })
        }
      })
    } else {
      res.status(500).json({ message: 'Este usuario no existe' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado' })
  }
}

// función manejadora que chequea la autenticación del usuario
export const checkAuth = (req, res) => {
  if (isLogged) {
    res
      .status(200)
      .json({
        message: `¡Bienvenid@, ${user.username}! Aún estamos construyendo el sitio, no hay mucho que ver por aquí`
      })
  } else {
    res.status(500).json({ message: 'No has iniciado sesión' })
  }
}

// función manejadora que cierra la sesión del usuario
export const logOut = (req, res) => {
  if (isLogged) {
    isLogged = false
    res.status(200).json({ message: `¡Hasta luego, ${user.username}!` })
  } else {
    res.status(500).json({ message: 'No puedes cerrar sesión si no estás logueado' })
  }
}

// función manejadora que envía los usuarios existentes en la base de datos
export const getUsers = async (req, res) => {
  try {
    const createdUsers = await UsersModel.find({})
    res.status(200).json({ createdUsers })
  } catch (err) {
    res.status(500).json({ error: 'There was an error.' })
  }
}
