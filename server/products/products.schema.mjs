import { Schema } from 'mongoose'

// definición del esquema de la tabla de usuarios con sus tipos y restricciones
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
export default schema
