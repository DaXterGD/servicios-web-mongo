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
    await usersModel.create(user)
    res.status(200).json({ message: `User ${user.username} created successfully` })
  } catch (err) {
    res.status(500).json({ message: 'This user already exists' })
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
