import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import schema from './users.schema.mjs'

// se importa el esquema de la base de datos para definir métodos para guardar datos y obtener los datos
schema.static = {
  create: (data, cb) => {
    const users = new this(data)
    users.save(cb)
  },
  get: (query, cb) => {
    this.find(query, cb)
  }
}

schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

// una vez que se tiene el esquema y métodos de la base de datos definidos, se crea el modelo
const usersModel = mongoose.model('users', schema)
export default usersModel
