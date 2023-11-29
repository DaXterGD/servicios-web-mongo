import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import schema from './users.schema.mjs'

// se importa el esquema de la base de datos para definir métodos estáticos para guardar datos y obtener los datos
schema.static = {
  create: (data, cb) => {
    const users = new this(data)
    users.save(cb)
  },
  get: (query, cb) => {
    this.find(query, cb)
  }
}

// definición de método para encriptar contraseña del usuario, este método solo estará disponible cuando se instancie un objeto de la clase
schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

// una vez que se tiene el esquema y métodos de la base de datos definidos, se crea el modelo
const UsersModel = mongoose.model('users', schema)
export default UsersModel
