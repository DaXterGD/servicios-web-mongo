import usersModel from './users.dao.mjs'

export const createUser = async (req, res) => {
  const user = {
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

export const authUser = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    const usernameExist = await usersModel.findOne({ username: user.username })
    if (usernameExist) {
      if (usernameExist.password === user.password) {
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

export const showProducts = (req, res) => {
  res.send('<h1>¡Bienvenid@, has iniciado sesión exitosamente!</h1>')
}

export const getUsers = async (req, res) => {
  try {
    const createdUsers = await usersModel.find({})
    res.status(200).json({ createdUsers })
  } catch (err) {
    res.status(500).json({ error: 'There was an error.' })
  }
}
