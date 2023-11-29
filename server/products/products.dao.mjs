import mongoose from 'mongoose'
import schema from './products.schema.mjs'

// se importa el esquema de la base de datos para definir métodos estáticos para guardar datos y obtener los datos
schema.static = {
  create: (data, cb) => {
    const product = new this(data)
    product.save(cb)
  },
  get: (query, cb) => {
    this.find(query, cb)
  }
}

// una vez que se tiene el esquema y métodos de la base de datos definidos, se crea el modelo
const ProductsModel = mongoose.model('products', schema)
export default ProductsModel
