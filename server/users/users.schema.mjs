import { Schema } from 'mongoose'

// definición del esquema de la base de datos con sus tipos y restricciones
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
      required: false
    }
  },
  { timestamps: true }
)
export default schema