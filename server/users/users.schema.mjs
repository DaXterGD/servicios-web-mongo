import { Schema } from 'mongoose'

// definición del esquema de la tabla de usuarios con sus tipos y restricciones
const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
      unique: true,
      required: true
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
export default schema
