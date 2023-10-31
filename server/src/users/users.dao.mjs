import mongoose from 'mongoose'
import schema from './users.schema.mjs'

schema.static = {
  create: (data, cb) => {
    const users = new this(data)
    users.save(cb)
  },
  get: (query, cb) => {
    this.find(query, cb)
  }
}
const usersModel = mongoose.model('users', schema)
export default usersModel
